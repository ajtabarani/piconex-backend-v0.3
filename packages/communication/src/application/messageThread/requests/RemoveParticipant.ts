import { MessageThreadId, MessageThreadRepository, PersonId } from "../../..";

export interface RemoveParticipantFromMessageThreadRequest {
  messageThreadId: MessageThreadId;
  personId: PersonId;
  actorId: PersonId;
}

export class RemoveParticipantFromMessageThread {
  constructor(private readonly repository: MessageThreadRepository) {}

  async execute(
    request: RemoveParticipantFromMessageThreadRequest,
  ): Promise<void> {
    const thread = await this.repository.load(request.messageThreadId);

    thread.removeParticipant(request.personId, request.actorId);

    await this.repository.save(thread);
  }
}
