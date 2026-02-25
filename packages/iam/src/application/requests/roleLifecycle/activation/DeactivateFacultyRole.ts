import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface DeactivateFacultyRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class DeactivateFacultyRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: DeactivateFacultyRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageFacultyDomain(request.actor));

    const person = await this.repository.load(request.personId);

    person.deactivateFacultyRole();

    await this.repository.save(person);
  }
}
