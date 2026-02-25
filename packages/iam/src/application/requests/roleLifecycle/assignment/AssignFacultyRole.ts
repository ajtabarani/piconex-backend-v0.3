import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface AssignFacultyRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  department: string | null;
  title: string | null;
}

export class AssignFacultyRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: AssignFacultyRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageFacultyDomain(request.actor));

    const person = await this.repository.load(request.personId);

    person.assignFacultyRole(request.department, request.title);

    await this.repository.save(person);
  }
}
