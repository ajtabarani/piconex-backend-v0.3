import { Address, Person, PersonId, PersonRepository } from "../../..";

export interface CreateFacultyFromExternalAuthRequest {
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

  department: string | null;
  title: string | null;
}

export class CreateFacultyFromExternalAuth {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: CreateFacultyFromExternalAuthRequest): Promise<void> {
    const existing = await this.repository.findByExternalAuthId(
      request.externalAuthId,
    );

    if (existing) {
      throw new Error("External account already linked");
    }

    const person = Person.createFacultyFromExternalAuth(
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
      request.department,
      request.title,
    );

    await this.repository.save(person);
  }
}
