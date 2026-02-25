import { PersonAuthorizationSnapshot } from "..";
import { PersonId, Role } from "../..";

export class PersonPolicy {
  canManageOwnIdentity(actor: PersonAuthorizationSnapshot, targetId: PersonId) {
    return actor.personId.equals(targetId) || actor.isSuperAdmin;
  }

  canManageStudentDomain(actor: PersonAuthorizationSnapshot) {
    return actor.isSuperAdmin || this.hasActiveRole(actor, Role.Admin);
  }

  canManageFacultyDomain(actor: PersonAuthorizationSnapshot) {
    return actor.isSuperAdmin || this.hasActiveRole(actor, Role.Admin);
  }

  canManageAdminDomain(actor: PersonAuthorizationSnapshot) {
    return actor.isSuperAdmin;
  }

  canManageSuperAdminDomain(actor: PersonAuthorizationSnapshot) {
    return actor.isSuperAdmin;
  }

  canManagePersonHierarchy(
    actor: PersonAuthorizationSnapshot,
    target: PersonAuthorizationSnapshot,
  ): boolean {
    const actorRank = this.getHighestRank(actor);
    const targetRank = this.getHighestRank(target);

    return actorRank > targetRank;
  }

  private hasActiveRole(actor: PersonAuthorizationSnapshot, role: Role) {
    return actor.roles.some((r) => r.role === role && r.active);
  }

  private getHighestRank(snapshot: PersonAuthorizationSnapshot): number {
    if (snapshot.isSuperAdmin) return 3;

    if (snapshot.roles.some((r) => r.role === Role.Admin && r.active)) return 2;

    if (snapshot.roles.some((r) => r.role === Role.Student && r.active))
      return 1;
    if (snapshot.roles.some((r) => r.role === Role.Faculty && r.active))
      return 1;

    return 0;
  }
}
