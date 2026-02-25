import { PersonId, Role, UniversityId } from "../..";

export type RoleAuthorizationSnapshot = {
  role: Role;
  active: boolean;
};

export type PersonAuthorizationSnapshot = {
  personId: PersonId;
  universityId: UniversityId | null;

  isActive: boolean;
  isSuperAdmin: boolean;

  roles: RoleAuthorizationSnapshot[];
};
