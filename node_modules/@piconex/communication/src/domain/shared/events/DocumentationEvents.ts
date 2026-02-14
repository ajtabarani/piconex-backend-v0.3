import { DomainEvent, DocumentationId, CaseId, PersonId } from "..";

export class DocumentationUploaded implements DomainEvent {
  constructor(
    public readonly documentationId: DocumentationId,
    public readonly caseId: CaseId | undefined,
    public readonly ownerId: PersonId,
    public readonly validatedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
