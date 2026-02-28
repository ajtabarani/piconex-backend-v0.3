import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface ReactivateFacultyRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class ReactivateFacultyRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: ReactivateFacultyRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.hasAdministrativeAuthority(request.actor));

    const person = await this.repository.load(request.personId);

    person.reactivateFacultyRole();

    await this.repository.save(person);
  }
}
