import { PersonId } from "../..";

export enum ParticipantRole {
  Moderator = "Moderator",
  Participant = "Participant",
}

export class MessageThreadParticipant {
  constructor(
    private readonly personId: PersonId,
    private role: ParticipantRole,
    private readonly joinedAt: Date,
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

  getJoinedAt() {
    return this.joinedAt;
  }
}
