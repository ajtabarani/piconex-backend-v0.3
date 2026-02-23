import { DomainEvent } from "..";
import { PersonId, Role } from "../..";

export class PersonCreated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly roles: Role[],
    public readonly occurredAt: Date,
  ) {}
}

export class PersonImported implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly importJobId: string,
    public readonly occurredAt: Date,
  ) {}
}
