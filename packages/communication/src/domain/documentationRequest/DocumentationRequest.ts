import {
  DomainEvent,
  DocumentationRequestCreated,
  DocumentationRequestMoreInfoRequested,
  DocumentationRequestApproved,
  DocumentationRequestCancelled,
  DocumentationRequestAttached,
  DocumentationRequestAccepted,
  DocumentationRequestRejected,
  DocumentationRequestAttachingDocumentationFinished,
  DocumentationRequestId,
  CaseId,
  DocumentationId,
  PersonId,
} from "..";
import { DocumentationRequestState } from "./valueObjects/DocumentationRequestState";

export default class DocumentationRequest {
  private readonly documentationRequestId: DocumentationRequestId;
  private readonly caseId: CaseId;
  private waitingDocumentationIds: DocumentationId[];
  private acceptedDocumentationIds: DocumentationId[];
  private rejectedDocumentationIds: DocumentationId[];

  private state: DocumentationRequestState;

  private readonly createdAt: Date;
  private readonly createdBy: PersonId;

  private domainEvents: DomainEvent[] = [];

  private constructor(
    documentationRequestId: DocumentationRequestId,
    caseId: CaseId,
    createdAt: Date,
    createdBy: PersonId,
    initialState: DocumentationRequestState,
    waitingDocumentationIds: DocumentationId[],
    acceptedDocumentationIds: DocumentationId[],
    rejectedDocumentationIds: DocumentationId[],
  ) {
    this.documentationRequestId = documentationRequestId;
    this.caseId = caseId;
    this.createdAt = createdAt;
    this.createdBy = createdBy;

    // Ensure arrays are unique
    this.waitingDocumentationIds = Array.from(new Set(waitingDocumentationIds));
    this.acceptedDocumentationIds = Array.from(
      new Set(acceptedDocumentationIds),
    );
    this.rejectedDocumentationIds = Array.from(
      new Set(rejectedDocumentationIds),
    );

    const allIds = [
      ...this.waitingDocumentationIds,
      ...this.acceptedDocumentationIds,
      ...this.rejectedDocumentationIds,
    ];

    const unique = new Set(allIds);

    if (unique.size !== allIds.length) {
      throw new Error(
        "A documentationId cannot exist in multiple state collections",
      );
    }

    // Validate initialState consistency with arrays
    switch (initialState) {
      case DocumentationRequestState.AwaitingStudentAction:
        // Any array combination is allowed
        break;

      case DocumentationRequestState.AwaitingAdminReview:
        if (this.waitingDocumentationIds.length < 1) {
          throw new Error(
            "Cannot start in AwaitingAdminReview state without waiting documentation",
          );
        }
        break;

      case DocumentationRequestState.Satisfied:
        if (this.acceptedDocumentationIds.length < 1) {
          throw new Error(
            "Cannot start in Satisfied state without at least one accepted document",
          );
        }
        break;

      case DocumentationRequestState.Cancelled:
        // Any combination is technically allowed
        break;

      default:
        throw new Error("Invalid initial state");
    }

    this.state = initialState;
  }

  // Factories
  static createNew(
    documentationRequestId: DocumentationRequestId,
    caseId: CaseId,
    actorId: PersonId,
  ): DocumentationRequest {
    const now = new Date();

    const docRequest = new DocumentationRequest(
      documentationRequestId,
      caseId,
      now,
      actorId,
      DocumentationRequestState.AwaitingStudentAction,
      [],
      [],
      [],
    );

    docRequest.domainEvents.push(
      new DocumentationRequestCreated(documentationRequestId, actorId, now),
    );

    return docRequest;
  }

  static restore(
    documentationRequestId: DocumentationRequestId,
    caseId: CaseId,
    createdAt: Date,
    createdBy: PersonId,
    initialState: DocumentationRequestState,
    waitingDocumentationIds: DocumentationId[],
    acceptedDocumentationIds: DocumentationId[],
    rejectedDocumentationIds: DocumentationId[],
  ): DocumentationRequest {
    return new DocumentationRequest(
      documentationRequestId,
      caseId,
      createdAt,
      createdBy,
      initialState,
      waitingDocumentationIds,
      acceptedDocumentationIds,
      rejectedDocumentationIds,
    );
  }

  // Commands
  attachDocumentation(documentationId: DocumentationId): void {
    if (this.state !== DocumentationRequestState.AwaitingStudentAction) {
      throw new Error(
        "Can only submit documentation when awaiting student action",
      );
    }

    const existsAnywhere =
      this.waitingDocumentationIds.some((id) => id.equals(documentationId)) ||
      this.acceptedDocumentationIds.some((id) => id.equals(documentationId)) ||
      this.rejectedDocumentationIds.some((id) => id.equals(documentationId));

    if (existsAnywhere) {
      throw new Error("DocumentationId already exists in this request");
    }

    this.waitingDocumentationIds.push(documentationId);

    this.domainEvents.push(
      new DocumentationRequestAttached(
        this.documentationRequestId,
        documentationId,
        new Date(),
      ),
    );
  }

  finishAttachingDocumentation(): void {
    if (this.state !== DocumentationRequestState.AwaitingStudentAction) {
      throw new Error(
        "Can only complete submission process when awaiting student action",
      );
    }
    if (this.waitingDocumentationIds.length < 1) {
      throw new Error(
        "Can only finish attaching documentation after documentation has been attached",
      );
    }
    this.state = DocumentationRequestState.AwaitingAdminReview;
    this.domainEvents.push(
      new DocumentationRequestAttachingDocumentationFinished(
        this.documentationRequestId,
        new Date(),
      ),
    );
  }

  acceptDocumentation(
    documentationId: DocumentationId,
    actorId: PersonId,
  ): void {
    if (this.state !== DocumentationRequestState.AwaitingAdminReview) {
      throw new Error("Can only accept documents when awaiting admin review");
    }
    if (!this.waitingDocumentationIds.includes(documentationId)) {
      throw new Error("Can only accept documents that have been uploaded");
    }
    if (this.acceptedDocumentationIds.includes(documentationId)) {
      throw new Error("Document has already been accepted");
    }
    this.acceptedDocumentationIds.push(documentationId);
    this.waitingDocumentationIds = this.waitingDocumentationIds.filter(
      (id) => id !== documentationId,
    );
    this.domainEvents.push(
      new DocumentationRequestAccepted(
        this.documentationRequestId,
        documentationId,
        actorId,
        new Date(),
      ),
    );
  }

  rejectDocumentation(
    documentationId: DocumentationId,
    actorId: PersonId,
  ): void {
    if (this.state !== DocumentationRequestState.AwaitingAdminReview) {
      throw new Error("Can only reject documents when awaiting admin review");
    }
    if (!this.waitingDocumentationIds.includes(documentationId)) {
      throw new Error("Can only reject documents that have been uploaded");
    }
    if (this.rejectedDocumentationIds.includes(documentationId)) {
      throw new Error("Document has already been rejected");
    }
    this.rejectedDocumentationIds.push(documentationId);
    this.waitingDocumentationIds = this.waitingDocumentationIds.filter(
      (id) => id !== documentationId,
    );
    this.domainEvents.push(
      new DocumentationRequestRejected(
        this.documentationRequestId,
        documentationId,
        actorId,
        new Date(),
      ),
    );
  }

  requestMoreInfo(actorId: PersonId): void {
    if (this.state !== DocumentationRequestState.AwaitingAdminReview) {
      throw new Error("Can only request more info when awaiting admin review");
    }
    this.state = DocumentationRequestState.AwaitingStudentAction;
    this.domainEvents.push(
      new DocumentationRequestMoreInfoRequested(
        this.documentationRequestId,
        actorId,
        new Date(),
      ),
    );
  }

  approveRequest(actorId: PersonId): void {
    if (
      this.state === DocumentationRequestState.Satisfied ||
      this.state === DocumentationRequestState.Cancelled
    ) {
      throw new Error(
        "Cannot approve a request that is already satisfied or cancelled",
      );
    }
    if (this.waitingDocumentationIds.length > 0) {
      throw new Error(
        "Cannot approve a request that has waiting documentation",
      );
    }
    if (this.acceptedDocumentationIds.length < 1) {
      throw new Error(
        "Cannot approve a request that has no approved documentation",
      );
    }
    this.state = DocumentationRequestState.Satisfied;
    this.domainEvents.push(
      new DocumentationRequestApproved(
        this.documentationRequestId,
        actorId,
        new Date(),
      ),
    );
  }

  cancelRequest(actorId: PersonId): void {
    if (
      this.state === DocumentationRequestState.Satisfied ||
      this.state === DocumentationRequestState.Cancelled
    ) {
      throw new Error(
        "Cannot cancel a request that is already satisfied or cancelled",
      );
    }
    this.state = DocumentationRequestState.Cancelled;
    this.domainEvents.push(
      new DocumentationRequestCancelled(
        this.documentationRequestId,
        actorId,
        new Date(),
      ),
    );
  }

  // Read Interfaces
  pullDomainEvents(): readonly DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }

  getState(): DocumentationRequestState {
    return this.state;
  }

  getAcceptedDocumentationIds(): readonly DocumentationId[] {
    return this.acceptedDocumentationIds;
  }
}
