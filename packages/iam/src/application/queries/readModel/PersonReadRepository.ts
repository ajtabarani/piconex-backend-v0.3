import {
  AdminProfileDTO,
  FacultyProfileDTO,
  PersonDTO,
  StudentProfileDTO,
} from "..";
import { PersonAuthorizationSnapshot } from "../..";
import { ExternalAuthId, PersonId } from "../../..";

export interface PersonReadRepository {
  findById(personId: PersonId): Promise<PersonDTO | null>;

  findByExternalAuthId(
    externalAuthId: ExternalAuthId,
  ): Promise<PersonDTO | null>;

  findAuthorizationSnapshot(
    personId: PersonId,
  ): Promise<PersonAuthorizationSnapshot | null>;

  findStudentProfile(personId: PersonId): Promise<StudentProfileDTO | null>;
  findFacultyProfile(personId: PersonId): Promise<FacultyProfileDTO | null>;
  findAdminProfile(personId: PersonId): Promise<AdminProfileDTO | null>;

  findSuperAdmin(): Promise<PersonDTO | null>;
}
