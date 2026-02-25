import { PersonAuthorizationSnapshot, PersonPolicy, PolicyGuard } from "../..";
import { PersonId, PersonRepository } from "../../..";

export interface UnlinkExternalAuthAccountRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class UnlinkExternalAuthAccount {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UnlinkExternalAuthAccountRequest): Promise<void> {
    // Unfinished

    const person = await this.repository.load(request.personId);

    person.unlinkExternalAuth();

    await this.repository.save(person);
  }
}
