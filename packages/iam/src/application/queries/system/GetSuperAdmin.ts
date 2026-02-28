import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonDTO, PersonReadRepository } from "..";

export interface GetSuperAdminRequest {
  actor: PersonAuthorizationSnapshot;
}

export class GetSuperAdmin {
  constructor(
    private readonly repository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: GetSuperAdminRequest): Promise<PersonDTO | null> {
    this.guard.ensure(this.policy.isSuperAdmin(request.actor));

    return this.repository.findSuperAdmin();
  }
}
