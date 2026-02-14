import { MeetingRepository, MeetingId, PersonId } from "../../..";
import { ParticipantRole } from "../../../domain/meeting/valueObjects";

export interface AddAttendeeRequest {
  meetingId: MeetingId;
  personId: PersonId;
  role: ParticipantRole;
  actorId: PersonId;
}

export class AddAttendee {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: AddAttendeeRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.addAttendee(request.personId, request.role, request.actorId);

    await this.repository.save(meeting);
  }
}
