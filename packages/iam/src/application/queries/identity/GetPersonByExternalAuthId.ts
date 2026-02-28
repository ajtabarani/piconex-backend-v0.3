import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { ExternalAuthId } from "../../..";
import { PersonDTO, PersonReadRepository } from "..";

export interface GetPersonByExternalAuthIdRequest {
  actor: PersonAuthorizationSnapshot;
  externalAuthId: ExternalAuthId;
}

export class GetPersonByExternalAuthId {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(
    request: GetPersonByExternalAuthIdRequest,
  ): Promise<PersonDTO | null> {
    this.guard.ensure(this.policy.hasAdministrativeAuthority(request.actor));

    return this.repository.findByExternalAuthId(request.externalAuthId);
  }
}
