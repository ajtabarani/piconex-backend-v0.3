import { Address, Person, PersonId, PersonRepository } from "../../..";

export interface CreateAdminRequest {
  personId: PersonId;
  externalAuthId: string;
  universityId: string | null;

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
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: CreateAdminRequest): Promise<void> {
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
