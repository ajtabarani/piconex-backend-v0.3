import { MeetingRepository, MeetingId, PersonId } from "../../..";

export interface PromoteAttendeeRequest {
  meetingId: MeetingId;
  personId: PersonId;
  actorId: PersonId;
}

export class PromoteAttendee {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: PromoteAttendeeRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.promoteAttendee(request.personId, request.actorId);

    await this.repository.save(meeting);
  }
}
