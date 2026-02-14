import {
  CaseId,
  MeetingId,
  PersonId,
  DurationMinutes,
  DomainEvent,
  MeetingCreated,
  MeetingRescheduled,
  MeetingCancelled,
  MeetingCompleted,
  MeetingAttendeeAdded,
  MeetingAttendeeRemoved,
  MeetingLocationChanged,
  MeetingAttendeePromoted,
  MeetingModeratorDemoted,
} from "..";
import {
  MeetingAttendee,
  ParticipantRole,
  MeetingState,
  MeetingLocation,
} from "./valueObjects";

export default class Meeting {
  private readonly meetingId: MeetingId;
  private readonly caseId?: CaseId;
  private meetingTime: Date;
  private durationMinutes: DurationMinutes;
  private location: MeetingLocation;
  private attendees: MeetingAttendee[];

  private state: MeetingState;

  private readonly createdAt: Date;
  private readonly createdBy: PersonId;

  private domainEvents: DomainEvent[] = [];

  private constructor(
    meetingId: MeetingId,
    caseId: CaseId | undefined,
    meetingTime: Date,
    durationMinutes: DurationMinutes,
    location: MeetingLocation,
    attendees: MeetingAttendee[],
    state: MeetingState,
    createdAt: Date,
    createdBy: PersonId,
  ) {
    // Basic Guards
    if (attendees.length === 0) {
      throw new Error("Meeting must have at least one attendee");
    }

    // Remove Duplicate Attendees (by personId)
    const uniqueAttendees = attendees.filter(
      (a, index, self) =>
        self.findIndex((x) => x.getPersonId().equals(a.getPersonId())) ===
        index,
    );

    if (uniqueAttendees.length !== attendees.length) {
      throw new Error("Duplicate attendees are not allowed");
    }

    // Must Have At Least One Moderator
    const moderators = uniqueAttendees.filter(
      (a) => a.getRole() === ParticipantRole.Moderator,
    );

    if (moderators.length === 0) {
      throw new Error("Meeting must have at least one moderator");
    }

    // Creator Rules
    const creator = uniqueAttendees.find((a) =>
      a.getPersonId().equals(createdBy),
    );

    if (!creator) {
      throw new Error("Creator must be an attendee");
    }

    if (creator.getRole() !== ParticipantRole.Moderator) {
      throw new Error("Creator must be a moderator");
    }

    // Assign State
    this.meetingId = meetingId;
    this.caseId = caseId;
    this.meetingTime = meetingTime;
    this.durationMinutes = durationMinutes;
    this.location = location;
    this.attendees = [...uniqueAttendees];
    this.state = state;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }

  // Factories
  static createNew(
    meetingId: MeetingId,
    meetingTime: Date,
    durationMinutes: DurationMinutes,
    location: MeetingLocation,
    attendees: MeetingAttendee[],
    createdBy: PersonId,
    caseId?: CaseId,
  ): Meeting {
    const now = new Date();

    const meeting = new Meeting(
      meetingId,
      caseId,
      meetingTime,
      durationMinutes,
      location,
      attendees,
      MeetingState.Scheduled,
      now,
      createdBy,
    );

    meeting.domainEvents.push(
      new MeetingCreated(
        meetingId,
        caseId,
        meetingTime,
        durationMinutes,
        createdBy,
        now,
      ),
    );

    return meeting;
  }

  static restore(
    meetingId: MeetingId,
    caseId: CaseId | undefined,
    meetingTime: Date,
    durationMinutes: DurationMinutes,
    location: MeetingLocation,
    attendees: MeetingAttendee[],
    state: MeetingState,
    createdAt: Date,
    createdBy: PersonId,
  ): Meeting {
    return new Meeting(
      meetingId,
      caseId,
      meetingTime,
      durationMinutes,
      location,
      attendees,
      state,
      createdAt,
      createdBy,
    );
  }

  // Helper Functions
  private ensureActorIsModerator(actorId: PersonId): void {
    const attendee = this.attendees.find((a) =>
      a.getPersonId().equals(actorId),
    );

    if (!attendee) {
      throw new Error("Actor is not part of this meeting");
    }

    if (attendee.getRole() !== ParticipantRole.Moderator) {
      throw new Error("Only moderators can modify this meeting");
    }
  }

  // Commands
  reschedule(
    newTime: Date,
    newDurationMinutes: DurationMinutes,
    changedBy: PersonId,
  ): void {
    this.ensureActorIsModerator(changedBy);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Only scheduled meetings can be rescheduled");
    }

    this.meetingTime = newTime;
    this.durationMinutes = newDurationMinutes;

    this.domainEvents.push(
      new MeetingRescheduled(
        this.meetingId,
        newTime,
        newDurationMinutes,
        changedBy,
        new Date(),
      ),
    );
  }

  cancel(actorId: PersonId, reason?: string): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Only scheduled meetings can be cancelled");
    }
    this.state = MeetingState.Cancelled;

    this.domainEvents.push(
      new MeetingCancelled(this.meetingId, actorId, reason, new Date()),
    );
  }

  complete(actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Only scheduled meetings can be completed");
    }

    this.state = MeetingState.Completed;

    this.domainEvents.push(
      new MeetingCompleted(this.meetingId, actorId, new Date()),
    );
  }

  addAttendee(
    personId: PersonId,
    role: ParticipantRole,
    actorId: PersonId,
  ): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Cannot modify attendees unless meeting is scheduled");
    }

    const exists = this.attendees.some((a) => a.getPersonId().equals(personId));

    if (exists) {
      throw new Error("Attendee already exists");
    }

    const now = new Date();

    this.attendees.push(new MeetingAttendee(personId, role, now));

    this.domainEvents.push(
      new MeetingAttendeeAdded(this.meetingId, personId, actorId, now),
    );
  }

  removeAttendee(personId: PersonId, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Cannot modify attendees unless meeting is scheduled");
    }

    const attendee = this.attendees.find((a) =>
      a.getPersonId().equals(personId),
    );

    if (!attendee) {
      throw new Error("Attendee does not exist");
    }

    if (personId.equals(this.createdBy)) {
      throw new Error("Meeting creator cannot be removed");
    }

    if (this.attendees.length === 1) {
      throw new Error("Meeting must have at least one attendee");
    }

    if (attendee.getRole() === ParticipantRole.Moderator) {
      const moderatorCount = this.attendees.filter(
        (a) => a.getRole() === ParticipantRole.Moderator,
      ).length;

      if (moderatorCount === 1) {
        throw new Error("Cannot remove the last moderator");
      }
    }

    this.attendees = this.attendees.filter(
      (a) => !a.getPersonId().equals(personId),
    );

    this.domainEvents.push(
      new MeetingAttendeeRemoved(this.meetingId, personId, actorId, new Date()),
    );
  }

  promoteAttendee(personId: PersonId, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Cannot modify attendees unless meeting is scheduled");
    }

    const attendee = this.attendees.find((a) =>
      a.getPersonId().equals(personId),
    );

    if (!attendee) {
      throw new Error("Attendee does not exist");
    }

    if (attendee.getRole() === ParticipantRole.Moderator) {
      throw new Error("Attendee is already a moderator");
    }

    attendee.changeRole(ParticipantRole.Moderator);

    this.domainEvents.push(
      new MeetingAttendeePromoted(
        this.meetingId,
        personId,
        actorId,
        new Date(),
      ),
    );
  }

  demoteModerator(personId: PersonId, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Cannot modify attendees unless meeting is scheduled");
    }

    const attendee = this.attendees.find((a) =>
      a.getPersonId().equals(personId),
    );

    if (!attendee) {
      throw new Error("Attendee does not exist");
    }

    if (attendee.getRole() !== ParticipantRole.Moderator) {
      throw new Error("Attendee is not a moderator");
    }

    if (personId.equals(this.createdBy)) {
      throw new Error("Meeting creator cannot be demoted");
    }

    const moderatorCount = this.attendees.filter(
      (a) => a.getRole() === ParticipantRole.Moderator,
    ).length;

    if (moderatorCount === 1) {
      throw new Error("Cannot demote the last moderator");
    }

    attendee.changeRole(ParticipantRole.Participant);

    this.domainEvents.push(
      new MeetingModeratorDemoted(
        this.meetingId,
        personId,
        actorId,
        new Date(),
      ),
    );
  }

  changeLocation(newLocation: MeetingLocation, actorId: PersonId): void {
    this.ensureActorIsModerator(actorId);

    if (this.state !== MeetingState.Scheduled) {
      throw new Error("Cannot change location unless meeting is scheduled");
    }

    this.location = newLocation;

    this.domainEvents.push(
      new MeetingLocationChanged(this.meetingId, actorId, new Date()),
    );
  }

  // Read Interfaces
  pullDomainEvents(): readonly DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }
}
