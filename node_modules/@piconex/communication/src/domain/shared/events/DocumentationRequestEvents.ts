import {
  DomainEvent,
  DocumentationRequestId,
  DocumentationId,
  PersonId,
} from "..";

export class DocumentationRequestCreated implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly adminId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestAttached implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly documentationId: DocumentationId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestAttachingDocumentationFinished implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestAccepted implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly documentationId: DocumentationId,
    public readonly adminId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestRejected implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly documentationId: DocumentationId,
    public readonly adminId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestMoreInfoRequested implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly adminId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestApproved implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly adminId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}

export class DocumentationRequestCancelled implements DomainEvent {
  constructor(
    public readonly documentationRequestId: DocumentationRequestId,
    public readonly adminId: PersonId,
    public readonly occurredAt: Date,
  ) {}
}
