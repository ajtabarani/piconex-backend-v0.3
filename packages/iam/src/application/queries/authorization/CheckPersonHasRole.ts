import { PersonId, Role } from "../../..";
import { PersonReadRepository } from "..";

export interface CheckPersonHasRoleRequest {
  personId: PersonId;
  role: Role;
}

export class CheckPersonHasRole {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(request: CheckPersonHasRoleRequest): Promise<boolean> {
    const snapshot = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!snapshot) return false;

    return snapshot.roles.some(
      (r) => r.role === request.role && r.active === true,
    );
  }
}
