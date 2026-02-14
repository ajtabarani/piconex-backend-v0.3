import { MessageThreadId, MessageThreadRepository, PersonId } from "../../..";
import { ParticipantRole } from "../../../domain/meeting/valueObjects";

export interface AddParticipant {
  messageThreadId: MessageThreadId;
  personId: PersonId;
  role: ParticipantRole;
  actorId: PersonId;
}

export class AddParticipant {
  constructor(private readonly repository: MessageThreadRepository) {}

  async execute(request: AddParticipant): Promise<void> {
    const thread = await this.repository.load(request.messageThreadId);

    thread.addParticipant(request.personId, request.role, request.actorId);

    await this.repository.save(thread);
  }
}
