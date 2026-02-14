import {
  CaseId,
  DocumentationId,
  DocumentationUploaded,
  DomainEvent,
  PersonId,
} from "..";
import FileReference from "./valueObjects/FileReference";

export default class Documentation {
  private readonly documentationId: DocumentationId;
  private readonly file: FileReference;
  private readonly caseId?: CaseId;
  private readonly ownerId: PersonId;

  private readonly createdAt: Date;
  private readonly createdBy: PersonId;

  private domainEvents: DomainEvent[] = [];

  private constructor(
    documentationId: DocumentationId,
    file: FileReference,
    caseId: CaseId | undefined,
    ownerId: PersonId,
    createdBy: PersonId,
    createdAt: Date,
  ) {
    this.documentationId = documentationId;
    this.file = file;
    this.caseId = caseId;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

  // Factory
  static upload(
    documentationId: DocumentationId,
    fileName: string,
    filePath: string,
    mimeType: string,
    fileSize: number,
    ownerId: PersonId,
    createdBy: PersonId,
    caseId?: CaseId,
  ): Documentation {
    const now = new Date();

    const file = FileReference.create(
      fileName,
      filePath,
      mimeType,
      fileSize,
      now,
    );

    const documentation = new Documentation(
      documentationId,
      file,
      caseId,
      ownerId,
      createdBy,
      now,
    );

    documentation.domainEvents.push(
      new DocumentationUploaded(
        documentationId,
        caseId,
        ownerId,
        createdBy,
        now,
      ),
    );

    return documentation;
  }

  // Read Interfaces
  pullDomainEvents(): readonly DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }

  getId(): DocumentationId {
    return this.documentationId;
  }

  getCaseId(): CaseId | undefined {
    return this.caseId;
  }

  getOwnerId(): PersonId {
    return this.ownerId;
  }

  getUploadedAt(): Date {
    return this.createdAt;
  }
}
