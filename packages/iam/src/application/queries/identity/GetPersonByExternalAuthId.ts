import { ExternalAuthId } from "../../../domain";
import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../policies";
import { PersonReadRepository, PersonDTO } from "../readModel";

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
