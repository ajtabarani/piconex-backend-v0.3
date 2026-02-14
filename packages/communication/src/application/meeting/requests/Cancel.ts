import { MeetingRepository, MeetingId, PersonId } from "../../..";

export interface CancelRequest {
  meetingId: MeetingId;
  actorId: PersonId;
  reason?: string;
}

export class Cancel {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: CancelRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.cancel(request.actorId, request.reason);

    await this.repository.save(meeting);
  }
}
