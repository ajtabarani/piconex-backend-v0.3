import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface UpdateAdminProfileRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  jobTitle: string | null;
  department: string | null;
  specialization: string | null;
}

export class UpdateAdminProfile {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateAdminProfileRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageAdminDomain(request.actor));

    const person = await this.repository.load(request.personId);

    person.updateAdminProfile(
      request.jobTitle,
      request.department,
      request.specialization,
    );

    await this.repository.save(person);
  }
}
