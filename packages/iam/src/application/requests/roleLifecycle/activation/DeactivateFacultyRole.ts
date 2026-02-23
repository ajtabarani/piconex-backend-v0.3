import { PersonId, PersonRepository } from "../../../..";

export interface DeactivateFacultyRoleRequest {
  personId: PersonId;
}

export class DeactivateFacultyRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: DeactivateFacultyRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.deactivateFacultyRole();

    await this.repository.save(person);
  }
}
