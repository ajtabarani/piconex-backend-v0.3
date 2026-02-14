import {
  CaseId,
  MessageThreadId,
  MessageThreadRepository,
  PersonId,
} from "../../..";
import { ParticipantRole } from "../../../domain/meeting/valueObjects";
import MessageThread from "../../../domain/messageThread/MessageThread";

export interface CreateMessageThreadRequest {
  messageThreadId: MessageThreadId;
  participants: { personId: PersonId; role: ParticipantRole }[];
  createdBy: PersonId;
  caseId?: CaseId;
}

export class CreateMessageThread {
  constructor(private readonly repository: MessageThreadRepository) {}

  async execute(request: CreateMessageThreadRequest): Promise<void> {
    // TODO: Query IAM to ensure request.createdBy is an Admin
    const thread = MessageThread.createNew(
      request.messageThreadId,
      request.participants,
      request.createdBy,
      request.caseId,
    );

    await this.repository.save(thread);
  }
}
