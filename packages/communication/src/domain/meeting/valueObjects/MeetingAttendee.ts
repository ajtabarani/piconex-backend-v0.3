import { PersonId } from "../..";

export enum ParticipantRole {
  Moderator = "Moderator",
  Participant = "Participant",
}

export class MeetingAttendee {
  constructor(
    private readonly personId: PersonId,
    private role: ParticipantRole,
    private addedAt: Date,
  ) {}

  changeRole(role: ParticipantRole) {
    this.role = role;
  }

  getPersonId() {
    return this.personId;
  }

  getRole() {
    return this.role;
  }

  getAddedAt() {
    return this.addedAt;
  }
}
