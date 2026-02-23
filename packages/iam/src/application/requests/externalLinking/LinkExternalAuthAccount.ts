import { ExternalAuthId, PersonId, PersonRepository } from "../../..";

export interface LinkExternalAuthAccountRequest {
  personId: PersonId;
  externalAuthId: ExternalAuthId;
}

export class LinkExternalAuthAccount {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: LinkExternalAuthAccountRequest): Promise<void> {
    const existing = await this.repository.findByExternalAuthId(
      request.externalAuthId,
    );

    if (existing) {
      throw new Error("External account already linked to another person");
    }

    const person = await this.repository.load(request.personId);

    person.linkExternalAuth(request.externalAuthId);

    await this.repository.save(person);
  }
}
