import { DomainEvent } from "..";
import { PersonId } from "../..";

export class PersonActivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class PersonDeactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
