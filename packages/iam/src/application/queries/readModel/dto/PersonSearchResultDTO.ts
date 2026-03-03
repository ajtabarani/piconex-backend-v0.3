import { Role } from "../../../../domain";

export type PersonSearchResultDTO = {
  personId: string;
  fullName: string;
  email: string;
  universityId: string | null;
  roles: Role[];
  isActive: boolean;
};
