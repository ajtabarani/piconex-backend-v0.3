import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface ReactivateStudentRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class ReactivateStudentRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: ReactivateStudentRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageStudentDomain(request.actor));

    const person = await this.repository.load(request.personId);

    person.reactivateStudentRole();

    await this.repository.save(person);
  }
}
