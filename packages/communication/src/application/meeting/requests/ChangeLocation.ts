import { MeetingRepository, MeetingId, PersonId } from "../../..";
import { MeetingLocation } from "../../../domain/meeting/valueObjects";

export interface ChangeLocationRequest {
  meetingId: MeetingId;
  newLocation: MeetingLocation;
  actorId: PersonId;
}

export class ChangeLocation {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: ChangeLocationRequest): Promise<void> {
    const meeting = await this.repository.load(request.meetingId);

    meeting.changeLocation(request.newLocation, request.actorId);

    await this.repository.save(meeting);
  }
}
