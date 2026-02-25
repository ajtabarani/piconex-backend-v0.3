import { PersonAuthorizationSnapshot, PersonPolicy, PolicyGuard } from "../..";
import { PersonId, PersonRepository } from "../../..";

export interface UpdateDemographicsRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  pronouns: string | null;
  sex: string | null;
  gender: string | null;
  birthday: Date | null;
}

export class UpdateDemographics {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateDemographicsRequest): Promise<void> {
    this.guard.ensure(
      this.policy.canManageOwnIdentity(request.actor, request.personId),
    );

    const person = await this.repository.load(request.personId);

    person.updateDemographics(
      request.pronouns,
      request.sex,
      request.gender,
      request.birthday,
    );

    await this.repository.save(person);
  }
}
