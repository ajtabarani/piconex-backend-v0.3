import { PersonAuthorizationSnapshot, PersonPolicy, PolicyGuard } from "../..";
import {
  Address,
  ExternalAuthId,
  Person,
  PersonId,
  PersonRepository,
  UniversityId,
} from "../../..";

export interface CreateAdminRequest {
  actor: PersonAuthorizationSnapshot;

  personId: PersonId;
  externalAuthId: ExternalAuthId;
  universityId: UniversityId | null;

  firstName: string;
  preferredName: string | null;
  middleName: string | null;
  lastName: string;

  email: string;
  phoneNumber: string | null;

  pronouns: string | null;
  sex: string | null;
  gender: string | null;
  birthday: Date | null;

  address: Address | null;

  jobTitle: string | null;
  department: string | null;
  specialization: string | null;
}

export class CreateAdmin {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: CreateAdminRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageAdminDomain(request.actor));

    const existing = await this.repository.findByExternalAuthId(
      request.externalAuthId,
    );

    if (existing) {
      throw new Error("External account already linked");
    }

    const person = Person.createAdmin(
      request.personId,
      request.externalAuthId,
      request.universityId,
      request.firstName,
      request.preferredName,
      request.middleName,
      request.lastName,
      request.email,
      request.phoneNumber,
      request.pronouns,
      request.sex,
      request.gender,
      request.birthday,
      request.address,
      request.jobTitle,
      request.department,
      request.specialization,
    );

    await this.repository.save(person);
  }
}
