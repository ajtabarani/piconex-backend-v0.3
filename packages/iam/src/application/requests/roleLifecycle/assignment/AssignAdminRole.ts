import { PersonId, PersonRepository } from "../../../..";

export interface AssignAdminRoleRequest {
  personId: PersonId;
  jobTitle: string | null;
  department: string | null;
  specialization: string | null;
}

export class AssignAdminRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: AssignAdminRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.assignAdminRole(
      request.jobTitle,
      request.department,
      request.specialization,
    );

    await this.repository.save(person);
  }
}
