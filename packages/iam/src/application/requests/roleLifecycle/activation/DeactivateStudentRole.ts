import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface DeactivateStudentRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class DeactivateStudentRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: DeactivateStudentRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageStudentDomain(request.actor));

    const person = await this.repository.load(request.personId);

    person.deactivateStudentRole();

    await this.repository.save(person);
  }
}
