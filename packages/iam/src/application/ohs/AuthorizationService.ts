import { PersonId, Role } from "../../domain";
import { PersonAuthorizationSnapshot } from "../policies";

export interface AuthorizationService {
  hasRole(
    actor: PersonAuthorizationSnapshot,
    personId: PersonId,
    role: Role,
  ): Promise<boolean>;

  isActive(
    actor: PersonAuthorizationSnapshot,
    personId: PersonId,
  ): Promise<boolean>;

  getAuthorizationSnapshot(
    actor: PersonAuthorizationSnapshot,
    personId: PersonId,
  ): Promise<PersonAuthorizationSnapshot | null>;
}
