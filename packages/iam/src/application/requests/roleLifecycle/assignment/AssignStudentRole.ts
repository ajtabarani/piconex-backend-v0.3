import { PersonId, PersonRepository } from "../../../..";

export interface AssignStudentRoleRequest {
  personId: PersonId;
  universityProgram: string | null;
  academicLevel: string | null;
  yearOfStudy: string | null;
}

export class AssignStudentRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: AssignStudentRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.assignStudentRole(
      request.universityProgram,
      request.academicLevel,
      request.yearOfStudy,
    );

    await this.repository.save(person);
  }
}
