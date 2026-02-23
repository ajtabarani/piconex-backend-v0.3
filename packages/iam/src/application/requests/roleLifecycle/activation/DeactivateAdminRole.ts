import { PersonId, PersonRepository } from "../../../..";

export interface DeactivateAdminRoleRequest {
  personId: PersonId;
}

export class DeactivateAdminRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: DeactivateAdminRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.deactivateAdminRole();

    await this.repository.save(person);
  }
}
