import { DomainEvent } from "..";
import { PersonId } from "../..";

export class SuperAdminGranted implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class SuperAdminRevoked implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
