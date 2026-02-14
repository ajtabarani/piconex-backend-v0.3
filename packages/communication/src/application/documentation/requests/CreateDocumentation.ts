import {
  DocumentationId,
  DocumentationRepository,
  CaseId,
  PersonId,
} from "../../..";
import Documentation from "../../../domain/documentation/Documentation";

export interface CreateDocumentationRequest {
  documentationId: DocumentationId;
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
  ownerId: PersonId;
  createdBy: PersonId;
  caseId?: CaseId;
}

export class CreateDocumentation {
  constructor(private readonly repository: DocumentationRepository) {}

  async execute(request: CreateDocumentationRequest): Promise<void> {
    const documentation = Documentation.upload(
      request.documentationId,
      request.fileName,
      request.filePath,
      request.mimeType,
      request.fileSize,
      request.ownerId,
      request.createdBy,
      request.caseId,
    );

    await this.repository.save(documentation);
  }
}
