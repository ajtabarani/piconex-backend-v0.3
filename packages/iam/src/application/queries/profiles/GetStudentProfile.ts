import {
  PersonAuthorizationSnapshot,
  PersonId,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonReadRepository, StudentProfileDTO } from "..";

export interface GetStudentProfileRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
}

export class GetStudentProfile {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(
    request: GetStudentProfileRequest,
  ): Promise<StudentProfileDTO | null> {
    const target = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) return null;

    this.guard.ensure(this.policy.canViewPerson(request.actor, target));

    return this.repository.findStudentProfile(request.personId);
  }
}
