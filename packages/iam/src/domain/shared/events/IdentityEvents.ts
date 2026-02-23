import { DomainEvent } from "..";
import { PersonId, UniversityId } from "../..";

export class ContactInformationUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class DemographicsUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class EmailUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly email: string,
    public readonly occurredAt: Date,
  ) {}
}

export class UniversityUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly universityId: UniversityId,
    public readonly occurredAt: Date,
  ) {}
}

export class StudentProfileUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class FacultyProfileUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class AdminProfileUpdated implements DomainEvent {
  constructor(
    public readonly personId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
