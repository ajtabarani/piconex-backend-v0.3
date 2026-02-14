import { MessageThreadId, MessageThreadRepository, PersonId } from "../../..";

export interface DemoteModeratorInMessageThreadRequest {
  messageThreadId: MessageThreadId;
  personId: PersonId;
  actorId: PersonId;
}

export class DemoteModeratorInMessageThread {
  constructor(private readonly repository: MessageThreadRepository) {}

  async execute(request: DemoteModeratorInMessageThreadRequest): Promise<void> {
    const thread = await this.repository.load(request.messageThreadId);

    thread.demoteModerator(request.personId, request.actorId);

    await this.repository.save(thread);
  }
}
