import { DocumentationRequestId } from "../shared";
import DocumentationRequest from "./DocumentationRequest";

export interface DocumentationRequestRepository {
  load(id: DocumentationRequestId): Promise<DocumentationRequest>;
  save(thread: DocumentationRequest): Promise<void>;
}
