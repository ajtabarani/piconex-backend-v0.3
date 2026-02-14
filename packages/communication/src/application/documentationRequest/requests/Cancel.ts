import {
  DocumentationRequestRepository,
  DocumentationRequestId,
  PersonId,
} from "../../..";

export interface CancelDocumentationRequestRequest {
  documentationRequestId: DocumentationRequestId;
  actorId: PersonId;
}

export class CancelDocumentationRequest {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: CancelDocumentationRequestRequest): Promise<void> {
    const docRequest = await this.repository.load(
      request.documentationRequestId,
    );

    docRequest.cancelRequest(request.actorId);

    await this.repository.save(docRequest);
  }
}
