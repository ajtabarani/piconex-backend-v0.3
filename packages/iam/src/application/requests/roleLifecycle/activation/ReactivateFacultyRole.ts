import { PersonId, PersonRepository } from "../../../..";

export interface ReactivateFacultyRoleRequest {
  personId: PersonId;
}

export class ReactivateFacultyRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: ReactivateFacultyRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.reactivateFacultyRole();

    await this.repository.save(person);
  }
}
