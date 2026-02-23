import { PersonId, PersonRepository } from "../../../..";

export interface ReactivateAdminRoleRequest {
  personId: PersonId;
}

export class ReactivateAdminRole {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: ReactivateAdminRoleRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.reactivateAdminRole();

    await this.repository.save(person);
  }
}
