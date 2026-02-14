import {
  DocumentationRequestId,
  DocumentationRequestRepository,
  CaseId,
  PersonId,
} from "../../..";
import DocumentationRequest from "../../../domain/documentationRequest/DocumentationRequest";

export interface CreateDocumentationRequestRequest {
  documentationRequestId: DocumentationRequestId;
  caseId: CaseId;
  actorId: PersonId;
}

export class CreateDocumentationRequest {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: CreateDocumentationRequestRequest): Promise<void> {
    const docRequest = DocumentationRequest.createNew(
      request.documentationRequestId,
      request.caseId,
      request.actorId,
    );

    await this.repository.save(docRequest);
  }
}
