import { DocumentationId } from "../shared";
import Documentation from "./Documentation";

export interface DocumentationRepository {
  load(id: DocumentationId): Promise<Documentation>;
  save(thread: Documentation): Promise<void>;
}
