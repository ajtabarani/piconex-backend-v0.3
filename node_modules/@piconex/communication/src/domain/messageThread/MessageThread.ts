import {
  DomainEvent,
  MessageParticipantAdded,
  MessageParticipantRemoved,
  MessagePosted,
  MessageThreadCreated,
  CaseId,
  MessageId,
  MessageThreadId,
  PersonId,
  MessageParticipantPromoted,
  MessageModeratorDemoted,
} from "..";
import { Message } from "./entities";
import { MessageThreadParticipant, ParticipantRole } from "./valueObjects";

export default class MessageThread {
  private readonly threadId: MessageThreadId;
  private readonly caseId?: CaseId;
  private participants: MessageThreadParticipant[];
  private messages: Message[];

  private readonly createdAt: Date;
  private readonly createdBy: PersonId;

  private domainEvents: DomainEvent[] = [];

  private constructor(
    threadId: MessageThreadId,
    caseId: CaseId | undefined,
    participants: MessageThreadParticipant[],
    messages: Message[],
    createdAt: Date,
    createdBy: PersonId,
  ) {
    // Basic Guards
    if (participants.length === 0) {
      throw new Error("Message thread must have at least one attendee");
    }

    // Remove Duplicate Participants (by personId)
    const uniqueParticipants = participants.filter(
      (a, index, self) =>
        self.findIndex((x) => x.getPersonId().equals(a.getPersonId())) ===
        index,
    );

    if (uniqueParticipants.length !== participants.length) {
      throw new Error("Duplicate participants are not allowed");
    }

    // Must Have At Least One Moderator
    const moderators = uniqueParticipants.filter(
      (a) => a.getRole() === ParticipantRole.Moderator,
    );

    if (moderators.length === 0) {
      throw new Error("Message thread must have at least one moderator");
    }

    // Creator Rules
    const creator = uniqueParticipants.find((a) =>
      a.getPersonId().equals(createdBy),
    );

    if (!creator) {
      throw new Error("Creator must be an participant");
    }

    if (creator.getRole() !== ParticipantRole.Moderator) {
      throw new Error("Creator must be a moderator");
    }

    this.threadId = threadId;
    this.caseId = caseId;
    this.participants = [...uniqueParticipants];
    this.messages = [...messages];
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

  // Factories
  static createNew(
    threadId: MessageThreadId,
    initialParticipants: { personId: PersonId; role: ParticipantRole }[],
    createdBy: PersonId,
    caseId?: CaseId,
  ): MessageThread {
    const now = new Date();

    const participants = initialParticipants.map(
      (p) => new MessageThreadParticipant(p.personId, p.role, now),
    );

    const thread = new MessageThread(
      threadId,
      caseId,
      participants,
      [],
      now,
      createdBy,
    );

    thread.domainEvents.push(
      new MessageThreadCreated(threadId, caseId, createdBy, now),
    );

    return thread;
  }

  static restore(
    threadId: MessageThreadId,
    caseId: CaseId | undefined,
    participants: MessageThreadParticipant[],
    messages: Message[],
    createdAt: Date,
    createdBy: PersonId,
  ): MessageThread {
    return new MessageThread(
      threadId,
      caseId,
      participants,
      messages,
      createdAt,
      createdBy,
    );
  }

  // Helper Functions
  private ensureActorIsModerator(actorId: PersonId): void {
    const attendee = this.participants.find((a) =>
      a.getPersonId().equals(actorId),
    );

    if (!attendee) {
      throw new Error("Actor is not part of this message thread");
    }

    if (attendee.getRole() !== ParticipantRole.Moderator) {
      throw new Error("Only moderators can modify this message thread");
    }
  }

  // Commands
  postMessage(
    messageId: MessageId,
    senderId: PersonId,
    messageText: string,
  ): void {
    if (!this.participants.some((p) => p.getPersonId().equals(senderId))) {
      throw new Error("Sender must be a participant in the thread");
    }
    if (this.messages.some((m) => m.getMessageId().equals(messageId))) {
      throw new Error("Message with this id already exists in thread");
    }

    const now = new Date();

    const message = new Message(messageId, senderId, messageText, now);

    this.messages.push(message);

    this.domainEvents.push(
      new MessagePosted(this.threadId, messageId, senderId, messageText, now),
    );
  }

  addParticipant(
    personId: PersonId,
    role: ParticipantRole,
    actorId: PersonId,
  ): void {
    this.ensureActorIsModerator(actorId);

    if (this.participants.some((p) => p.getPersonId().equals(personId))) {
      throw new Error("Participant already exists");
    }

    const now = new Date();

    this.participants.push(new MessageThreadParticipant(personId, role, now));
    this.domainEvents.push(
      new MessageParticipantAdded(this.threadId, personId, actorId, now),
    );
  }

  removeParticipant(personId: PersonId, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    const participant = this.participants.find((p) =>
      p.getPersonId().equals(personId),
    );

    if (!participant) {
      throw new Error("Participant does not exist");
    }

    if (this.participants.length === 1) {
      throw new Error("Thread must have at least one participant");
    }

    if (participant.getRole() === ParticipantRole.Moderator) {
      const moderatorCount = this.participants.filter(
        (p) => p.getRole() === ParticipantRole.Moderator,
      ).length;

      if (moderatorCount === 1) {
        throw new Error("Cannot remove the last moderator");
      }
    }

    this.participants = this.participants.filter(
      (p) => !p.getPersonId().equals(personId),
    );

    this.domainEvents.push(
      new MessageParticipantRemoved(
        this.threadId,
        personId,
        actorId,
        new Date(),
      ),
    );
  }

  promoteParticipant(personId: PersonId, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    const participant = this.participants.find((p) =>
      p.getPersonId().equals(personId),
    );

    if (!participant) {
      throw new Error("Participant does not exist");
    }

    if (participant.getRole() === ParticipantRole.Moderator) {
      throw new Error("Participant is already a moderator");
    }

    participant.changeRole(ParticipantRole.Moderator);

    this.domainEvents.push(
      new MessageParticipantPromoted(
        this.threadId,
        personId,
        actorId,
        new Date(),
      ),
    );
  }

  demoteModerator(personId: PersonId, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    const participant = this.participants.find((p) =>
      p.getPersonId().equals(personId),
    );

    if (!participant) {
      throw new Error("Participant does not exist");
    }

    if (participant.getRole() !== ParticipantRole.Moderator) {
      throw new Error("Participant is not a moderator");
    }

    const moderatorCount = this.participants.filter(
      (p) => p.getRole() === ParticipantRole.Moderator,
    ).length;

    if (moderatorCount === 1) {
      throw new Error("Cannot demote the last moderator");
    }

    participant.changeRole(ParticipantRole.Participant);

    this.domainEvents.push(
      new MessageModeratorDemoted(this.threadId, personId, actorId, new Date()),
    );
  }

  // Read Interfaces
  pullDomainEvents(): readonly DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }
}
