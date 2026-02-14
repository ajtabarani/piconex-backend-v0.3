import {
  DocumentationRequestRepository,
  DocumentationRequestId,
  PersonId,
} from "../../..";

export interface ApproveDocumentationRequestRequest {
  documentationRequestId: DocumentationRequestId;
  actorId: PersonId;
}

export class ApproveDocumentationRequest {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: ApproveDocumentationRequestRequest): Promise<void> {
    const docRequest = await this.repository.load(
      request.documentationRequestId,
    );

    docRequest.approveRequest(request.actorId);

    await this.repository.save(docRequest);
  }
}
