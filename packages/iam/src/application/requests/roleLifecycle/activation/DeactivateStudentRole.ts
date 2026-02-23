import { PersonId, PersonRepository } from "../../../..";

export interface DeactivateStudentRoleRequest {
  personId: PersonId;
}

export class DeactivateStudentRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: DeactivateStudentRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.deactivateStudentRole();

    await this.repository.save(person);
  }
}
