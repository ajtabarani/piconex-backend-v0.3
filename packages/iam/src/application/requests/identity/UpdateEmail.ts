import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
  PersonReadRepository,
} from "../..";
import { PersonId, PersonRepository } from "../../..";

export interface UpdateEmailRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  email: string;
}

export class UpdateEmail {
  constructor(
    private readonly repository: PersonRepository,
    private readonly readRepository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateEmailRequest): Promise<void> {
    const target = await this.readRepository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) throw new Error("Person not found");

    this.guard.ensure(this.policy.canManagePerson(request.actor, target));

    const person = await this.repository.load(request.personId);

    person.updateEmail(request.email);

    await this.repository.save(person);
  }
}
