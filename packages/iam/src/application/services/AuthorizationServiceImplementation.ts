import { PersonId, Role } from "../../domain";
import { AuthorizationService } from "../ohs";
import { PersonAuthorizationSnapshot } from "../policies";
import {
  CheckPersonHasRole,
  CheckPersonIsActive,
  GetPersonAuthorizationSnapshot,
} from "../queries";

export class AuthorizationServiceImpl implements AuthorizationService {
  constructor(
    private readonly checkPersonHasRole: CheckPersonHasRole,
    private readonly checkPersonIsActive: CheckPersonIsActive,
    private readonly getAuthorizationSnapshotQuery: GetPersonAuthorizationSnapshot,
  ) {}

  async hasRole(
    actor: PersonAuthorizationSnapshot,
    personId: PersonId,
    role: Role,
  ): Promise<boolean> {
    return this.checkPersonHasRole.execute({
      actor,
      personId,
      role,
    });
  }

  async isActive(
    actor: PersonAuthorizationSnapshot,
    personId: PersonId,
  ): Promise<boolean> {
    return this.checkPersonIsActive.execute({
      actor,
      personId,
    });
  }

  async getAuthorizationSnapshot(
    actor: PersonAuthorizationSnapshot,
    personId: PersonId,
  ): Promise<PersonAuthorizationSnapshot | null> {
    return this.getAuthorizationSnapshotQuery.execute({
      actor,
      personId,
    });
  }
}
