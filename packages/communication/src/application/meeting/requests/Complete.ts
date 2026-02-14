import { MeetingRepository, MeetingId, PersonId } from "../../..";

export interface CompleteRequest {
  meetingId: MeetingId;
  actorId: PersonId;
}

export class Complete {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: CompleteRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.complete(request.actorId);

    await this.repository.save(meeting);
  }
}
