import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface AssignStudentRoleRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  universityProgram: string | null;
  academicLevel: string | null;
  yearOfStudy: string | null;
}

export class AssignStudentRole {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: AssignStudentRoleRequest): Promise<void> {
    this.guard.ensure(this.policy.hasAdministrativeAuthority(request.actor));

    const person = await this.repository.load(request.personId);

    person.assignStudentRole(
      request.universityProgram,
      request.academicLevel,
      request.yearOfStudy,
    );

    await this.repository.save(person);
  }
}
