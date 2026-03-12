import { DomainEvent } from "..";
import { ExternalAuthId, PersonId, UniversityId } from "../..";

export class ExternalAuthLinked implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly externalAuthId: ExternalAuthId,
    public readonly occurredAt: Date,
  ) {}
}

export class ExternalAuthUnlinked implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
