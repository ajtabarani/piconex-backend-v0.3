import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface ReactivateAdminRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class ReactivateAdminRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: ReactivateAdminRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.isSuperAdmin(request.actor));

    const person = await this.repository.load(request.personId);

    person.reactivateAdminRole();

    await this.repository.save(person);
  }
}
