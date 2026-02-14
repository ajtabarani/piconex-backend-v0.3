import {
  DocumentationRequestRepository,
  DocumentationRequestId,
  DocumentationId,
} from "../../..";

export interface AttachDocumentationRequest {
  documentationRequestId: DocumentationRequestId;
  documentationId: DocumentationId;
}

export class AttachDocumentation {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: AttachDocumentationRequest): Promise<void> {
    const docRequest = await this.repository.load(
      request.documentationRequestId,
    );

    docRequest.attachDocumentation(request.documentationId);

    await this.repository.save(docRequest);
  }
}
