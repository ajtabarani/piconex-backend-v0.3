import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface AssignAdminRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  jobTitle: string | null;
  department: string | null;
  specialization: string | null;
}

export class AssignAdminRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: AssignAdminRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.isSuperAdmin(request.actor));

    const person = await this.repository.load(request.personId);

    person.assignAdminRole(
      request.jobTitle,
      request.department,
      request.specialization,
    );

    await this.repository.save(person);
  }
}
