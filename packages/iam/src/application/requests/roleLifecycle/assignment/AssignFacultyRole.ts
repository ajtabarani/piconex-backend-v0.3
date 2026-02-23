import { PersonId, PersonRepository } from "../../../..";

export interface AssignFacultyRoleRequest {
  personId: PersonId;
  department: string | null;
  title: string | null;
}

export class AssignFacultyRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: AssignFacultyRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.assignFacultyRole(request.department, request.title);

    await this.repository.save(person);
  }
}
