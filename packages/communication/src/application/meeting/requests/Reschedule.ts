import {
  MeetingRepository,
  MeetingId,
  DurationMinutes,
  PersonId,
} from "../../..";

export interface RescheduleRequest {
  meetingId: MeetingId;
  newTime: Date;
  newDurationMinutes: DurationMinutes;
  actorId: PersonId;
}

export class Reschedule {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: RescheduleRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.reschedule(
      request.newTime,
      request.newDurationMinutes,
      request.actorId,
    );

    await this.repository.save(meeting);
  }
}
