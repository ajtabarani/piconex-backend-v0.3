import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface UpdateEmailRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  email: string;
}

export class UpdateEmail {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateEmailRequest): Promise<void> {
    this.guard.ensure(
      this.policy.canManageOwnIdentity(request.actor, request.personId),
    );

    const person = await this.repository.load(request.personId);

    person.updateEmail(request.email);

    await this.repository.save(person);
  }
}
