import { MeetingId } from "../..";
import Meeting from "./Meeting";

export interface MeetingRepository {
  load(id: MeetingId): Promise<Meeting>;
  save(thread: Meeting): Promise<void>;
}
