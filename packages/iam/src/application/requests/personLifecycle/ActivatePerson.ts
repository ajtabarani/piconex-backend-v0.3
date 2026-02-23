import { PersonId, PersonRepository } from "../../..";

export interface ActivatePersonRequest {
  personId: PersonId;
}

export class ActivatePerson {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: ActivatePersonRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.activate();

    await this.repository.save(person);
  }
}
