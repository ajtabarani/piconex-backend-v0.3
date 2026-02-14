import {
  MessageId,
  MessageThreadId,
  MessageThreadRepository,
  PersonId,
} from "../../..";

export interface PostMessageRequest {
  messageThreadId: MessageThreadId;
  messageId: MessageId;
  senderId: PersonId;
  text: string;
}

export class PostMessage {
  constructor(private readonly repository: MessageThreadRepository) {}

  async execute(request: PostMessageRequest): Promise<void> {
    const thread = await this.repository.load(request.messageThreadId);

    thread.postMessage(request.messageId, request.senderId, request.text);

    await this.repository.save(thread);
  }
}
