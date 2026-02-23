import { Role } from "../../../..";

export type RoleAuthorizationSnapshot = {
  role: Role;
  active: boolean;
};

export type PersonAuthorizationSnapshot = {
  personId: string;
  universityId: string | null;

  isActive: boolean;
  isSuperAdmin: boolean;

  roles: RoleAuthorizationSnapshot[];
};
