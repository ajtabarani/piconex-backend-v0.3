import { MessageThreadId } from "../..";
import MessageThread from "./MessageThread";

export interface MessageThreadRepository {
  load(id: MessageThreadId): Promise<MessageThread>;
  save(thread: MessageThread): Promise<void>;
}
