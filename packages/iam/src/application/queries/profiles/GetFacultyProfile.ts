import {
  PersonAuthorizationSnapshot,
  PersonId,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { FacultyProfileDTO, PersonReadRepository } from "..";

export interface GetFacultyProfileRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class GetFacultyProfile {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(
    request: GetFacultyProfileRequest,
  ): Promise<FacultyProfileDTO | null> {
    const target = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) return null;

    this.guard.ensure(this.policy.canViewPerson(request.actor, target));

    return this.repository.findFacultyProfile(request.personId);
  }
}
