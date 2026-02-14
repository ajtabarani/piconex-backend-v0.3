import {
  DocumentationRequestRepository,
  DocumentationRequestId,
  DocumentationId,
  PersonId,
} from "../../..";

export interface AcceptDocumentationRequest {
  documentationRequestId: DocumentationRequestId;
  documentationId: DocumentationId;
  actorId: PersonId;
}

export class AcceptDocumentation {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: AcceptDocumentationRequest): Promise<void> {
    const docRequest = await this.repository.load(
      request.documentationRequestId,
    );

    docRequest.acceptDocumentation(request.documentationId, request.actorId);

    await this.repository.save(docRequest);
  }
}
