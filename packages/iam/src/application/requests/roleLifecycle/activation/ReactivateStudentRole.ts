import { PersonId, PersonRepository } from "../../../..";

export interface ReactivateStudentRoleRequest {
  personId: PersonId;
}

export class ReactivateStudentRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: ReactivateStudentRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.reactivateStudentRole();

    await this.repository.save(person);
  }
}
