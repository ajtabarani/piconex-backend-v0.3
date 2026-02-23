import { DomainEvent } from "..";
import { PersonId } from "../..";

export class StudentRoleAssigned implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class FacultyRoleAssigned implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class AdminRoleAssigned implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class StudentRoleDeactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class StudentRoleReactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class FacultyRoleDeactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class FacultyRoleReactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class AdminRoleDeactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class AdminRoleReactivated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
