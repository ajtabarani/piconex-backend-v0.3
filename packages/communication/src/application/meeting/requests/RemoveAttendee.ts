import { MeetingRepository, MeetingId, PersonId } from "../../..";

export interface RemoveAttendeeRequest {
  meetingId: MeetingId;
  personId: PersonId;
  actorId: PersonId;
}

export class RemoveAttendee {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: RemoveAttendeeRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.removeAttendee(request.personId, request.actorId);

    await this.repository.save(meeting);
  }
}
