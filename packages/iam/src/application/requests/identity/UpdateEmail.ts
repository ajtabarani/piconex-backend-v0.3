import { PersonId, PersonRepository } from "../../..";

export interface UpdateEmailRequest {
  personId: PersonId;
  email: string;
}

export class UpdateEmail {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateEmailRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateEmail(request.email);

    await this.repository.save(person);
  }
}
