import { CaseId, DomainEvent, DurationMinutes, MeetingId, PersonId } from "..";

export class MeetingCreated implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly caseId: CaseId | undefined,
    public readonly meetingTime: Date,
    public readonly durationMinutes: DurationMinutes,
    public readonly createdBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingRescheduled implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly newTime: Date,
    public readonly newDurationMinutes: DurationMinutes,
    public readonly changedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingCancelled implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly cancelledBy: PersonId,
    public readonly reason: string | undefined,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingCompleted implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly completedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingAttendeeAdded implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly personId: PersonId,
    public readonly addedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingAttendeeRemoved implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly personId: PersonId,
    public readonly removedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingAttendeePromoted implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly personId: PersonId,
    public readonly addedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingModeratorDemoted implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly personId: PersonId,
    public readonly removedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MeetingLocationChanged implements DomainEvent {
  constructor(
    public readonly meetingId: MeetingId,
    public readonly changedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
