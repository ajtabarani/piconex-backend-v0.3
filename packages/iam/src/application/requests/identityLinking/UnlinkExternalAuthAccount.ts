import { PersonId, PersonRepository } from "../../..";

export interface UnlinkExternalAuthAccountRequest {
  personId: PersonId;
}

export class UnlinkExternalAuthAccount {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UnlinkExternalAuthAccountRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.unlinkExternalAuth();

    await this.repository.save(person);
  }
}
