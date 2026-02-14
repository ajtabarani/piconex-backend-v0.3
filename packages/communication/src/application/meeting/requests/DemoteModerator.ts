import { MeetingRepository, MeetingId, PersonId } from "../../..";

export interface DemoteModeratorRequest {
  meetingId: MeetingId;
  personId: PersonId;
  actorId: PersonId;
}

export class DemoteModerator {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: DemoteModeratorRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.demoteModerator(request.personId, request.actorId);

    await this.repository.save(meeting);
  }
}
