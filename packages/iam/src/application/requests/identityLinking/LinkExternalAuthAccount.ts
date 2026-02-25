import { PersonAuthorizationSnapshot, PersonPolicy, PolicyGuard } from "../..";
import { ExternalAuthId, PersonId, PersonRepository } from "../../..";

export interface LinkExternalAuthAccountRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  externalAuthId: ExternalAuthId;
}

export class LinkExternalAuthAccount {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: LinkExternalAuthAccountRequest): Promise<void> {
    // Unfinished

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
