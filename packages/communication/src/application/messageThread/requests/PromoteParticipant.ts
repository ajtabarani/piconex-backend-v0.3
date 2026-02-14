import { MessageThreadId, MessageThreadRepository, PersonId } from "../../..";

export interface PromoteParticipantInMessageThreadRequest {
  messageThreadId: MessageThreadId;
  personId: PersonId;
  actorId: PersonId;
}

export class PromoteParticipantInMessageThread {
  constructor(private readonly repository: MessageThreadRepository) {}

  async execute(
    request: PromoteParticipantInMessageThreadRequest,
  ): Promise<void> {
    const thread = await this.repository.load(request.messageThreadId);

    thread.promoteParticipant(request.personId, request.actorId);

    await this.repository.save(thread);
  }
}
