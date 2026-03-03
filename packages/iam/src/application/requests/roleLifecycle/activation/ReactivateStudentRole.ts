import { PersonId, PersonRepository } from "../../../../domain";
import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../../policies";

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
    this.guard.ensure(this.policy.hasAdministrativeAuthority(request.actor));

    const person = await this.repository.load(request.personId);

    person.reactivateStudentRole();

    await this.repository.save(person);
  }
}
