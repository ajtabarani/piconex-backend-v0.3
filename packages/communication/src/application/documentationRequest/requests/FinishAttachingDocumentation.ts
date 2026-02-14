import {
  DocumentationRequestRepository,
  DocumentationRequestId,
} from "../../..";

export interface FinishAttachingDocumentationRequest {
  documentationRequestId: DocumentationRequestId;
}

export class FinishAttachingDocumentation {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: FinishAttachingDocumentationRequest): Promise<void> {
    const docRequest = await this.repository.load(
      request.documentationRequestId,
    );

    docRequest.finishAttachingDocumentation();

    await this.repository.save(docRequest);
  }
}
