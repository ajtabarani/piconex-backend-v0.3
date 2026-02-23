import { Role } from "../../../..";

export type PersonSearchResultDTO = {
  personId: string;
  fullName: string;
  email: string;
  universityId: string | null;
  roles: Role[];
  isActive: boolean;
};
