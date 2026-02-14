import {
  MeetingId,
  MeetingRepository,
  PersonId,
  DurationMinutes,
  CaseId,
} from "../../..";
import Meeting from "../../../domain/meeting/Meeting";
import {
  MeetingLocation,
  ParticipantRole,
  MeetingAttendee,
} from "../../../domain/meeting/valueObjects";

export interface CreateMeetingRequest {
  meetingId: MeetingId;
  meetingTime: Date;
  durationMinutes: DurationMinutes;
  location: MeetingLocation;
  attendees: { personId: PersonId; role: ParticipantRole }[];
  createdBy: PersonId;
  caseId?: CaseId;
}

export class CreateMeeting {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: CreateMeetingRequest): Promise<void> {
    const attendees = request.attendees.map(
      (a) => new MeetingAttendee(a.personId, a.role, new Date()),
    );

    const meeting = Meeting.createNew(
      request.meetingId,
      request.meetingTime,
      request.durationMinutes,
      request.location,
      attendees,
      request.createdBy,
      request.caseId,
    );

    await this.repository.save(meeting);
  }
}
