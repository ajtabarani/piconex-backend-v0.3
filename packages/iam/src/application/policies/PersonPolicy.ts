import { PersonAuthorizationSnapshot } from "..";
import { Role } from "../..";

export class PersonPolicy {
  canManageOwnIdentity(actor: PersonAuthorizationSnapshot, targetId: string) {
    return actor.personId === targetId || actor.isSuperAdmin;
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

  private hasActiveRole(actor: PersonAuthorizationSnapshot, role: Role) {
    return actor.roles.some((r) => r.role === role && r.active);
  }
}
