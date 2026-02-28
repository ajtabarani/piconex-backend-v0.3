import {
  PersonAuthorizationSnapshot,
  PersonId,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonDTO, PersonReadRepository } from "..";

export interface GetPersonByIdRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class GetPersonById {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: GetPersonByIdRequest): Promise<PersonDTO | null> {
    const target = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) return null;

    this.guard.ensure(this.policy.canViewPerson(request.actor, target));

    return this.repository.findById(request.personId);
  }
}
