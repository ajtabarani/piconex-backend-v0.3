import { PersonAuthorizationSnapshot, PersonPolicy, PolicyGuard } from "../..";
import { PersonId, Address, PersonRepository } from "../../..";

export interface UpdateContactInformationRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  phoneNumber: string | null;
  address: Address | null;
}

export class UpdateContactInformation {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateContactInformationRequest): Promise<void> {
    this.guard.ensure(
      this.policy.canManageOwnIdentity(request.actor, request.personId),
    );

    const person = await this.repository.load(request.personId);

    person.updateContactInformation(request.phoneNumber, request.address);

    await this.repository.save(person);
  }
}
