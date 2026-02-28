import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PersonReadRepository,
  PolicyGuard,
} from "../..";
import { PersonId, PersonRepository } from "../../..";

export interface DeactivatePersonRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class DeactivatePerson {
  constructor(
    private readonly repository: PersonRepository,
    private readonly readRepository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: DeactivatePersonRequest): Promise<void> {
    const target = await this.readRepository.findAuthorizationSnapshot(
      request.personId,
    );
    if (!target) throw new Error("Person not found");

    this.guard.ensure(this.policy.canManagePerson(request.actor, target));

    const person = await this.repository.load(request.personId);

    person.deactivate();

    await this.repository.save(person);
  }
}
