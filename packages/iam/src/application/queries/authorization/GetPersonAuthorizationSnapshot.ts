import {
  PersonAuthorizationSnapshot,
  PersonId,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonReadRepository } from "..";

export interface GetPersonAuthorizationSnapshotRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class GetPersonAuthorizationSnapshot {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(
    request: GetPersonAuthorizationSnapshotRequest,
  ): Promise<PersonAuthorizationSnapshot | null> {
    const target = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) return null;

    this.guard.ensure(this.policy.canViewPerson(request.actor, target));

    return target;
  }
}
