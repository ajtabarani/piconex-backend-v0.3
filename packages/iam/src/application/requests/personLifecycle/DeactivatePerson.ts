import { PersonId, PersonRepository } from "../../..";

export interface DeactivatePersonRequest {
  personId: PersonId;
}

export class DeactivatePerson {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: DeactivatePersonRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.deactivate();

    await this.repository.save(person);
  }
}
