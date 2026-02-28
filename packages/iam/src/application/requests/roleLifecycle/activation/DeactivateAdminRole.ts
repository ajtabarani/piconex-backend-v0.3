import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface DeactivateAdminRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class DeactivateAdminRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: DeactivateAdminRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.isSuperAdmin(request.actor));

    const person = await this.repository.load(request.personId);

    person.deactivateAdminRole();

    await this.repository.save(person);
  }
}
