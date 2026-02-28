import {
  PersonAuthorizationSnapshot,
  PersonId,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonReadRepository } from "..";

export interface CheckPersonIsActiveRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class CheckPersonIsActive {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: CheckPersonIsActiveRequest): Promise<boolean> {
    const target = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) return false;

    this.guard.ensure(this.policy.canViewPerson(request.actor, target));

    return target.isActive;
  }
}
