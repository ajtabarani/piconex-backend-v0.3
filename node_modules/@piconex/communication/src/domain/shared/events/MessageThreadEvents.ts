import { CaseId, DomainEvent, MessageId, MessageThreadId, PersonId } from "..";

export class MessageThreadCreated implements DomainEvent {
  constructor(
    public readonly threadId: MessageThreadId,
    public readonly caseId: CaseId | undefined,
    public readonly createdBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MessagePosted implements DomainEvent {
  constructor(
    public readonly threadId: MessageThreadId,
    public readonly messageId: MessageId,
    public readonly senderId: PersonId,
    public readonly messageText: string,
    public readonly occurredAt: Date,
  ) {}
}

export class MessageParticipantAdded implements DomainEvent {
  constructor(
    public readonly threadId: MessageThreadId,
    public readonly personId: PersonId,
    public readonly addedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MessageParticipantRemoved implements DomainEvent {
  constructor(
    public readonly threadId: MessageThreadId,
    public readonly personId: PersonId,
    public readonly removedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MessageParticipantPromoted implements DomainEvent {
  constructor(
    public readonly threadId: MessageThreadId,
    public readonly personId: PersonId,
    public readonly addedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class MessageModeratorDemoted implements DomainEvent {
  constructor(
    public readonly threadId: MessageThreadId,
    public readonly personId: PersonId,
    public readonly addedBy: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
