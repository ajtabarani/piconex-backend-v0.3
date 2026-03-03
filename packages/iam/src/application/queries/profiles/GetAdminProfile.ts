import { PersonId } from "../../../domain";
import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../policies";
import { PersonReadRepository, AdminProfileDTO } from "../readModel";

export interface GetAdminProfileRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class GetAdminProfile {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(
    request: GetAdminProfileRequest,
  ): Promise<AdminProfileDTO | null> {
    const target = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) return null;

    this.guard.ensure(this.policy.canViewPerson(request.actor, target));

    return this.repository.findAdminProfile(request.personId);
  }
}
