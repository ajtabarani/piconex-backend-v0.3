import { MessageId, PersonId } from "../..";

export class Message {
  constructor(
    private readonly messageId: MessageId,
    private readonly senderId: PersonId,
    private readonly messageText: string,
    private readonly createdAt: Date,
  ) {
    if (!messageText || messageText.trim().length === 0) {
      throw new Error("Message text cannot be empty");
    }
  }

  getMessageId() {
    return this.messageId;
  }

  getSenderId() {
    return this.senderId;
  }

  getMessageText() {
    return this.messageText;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
