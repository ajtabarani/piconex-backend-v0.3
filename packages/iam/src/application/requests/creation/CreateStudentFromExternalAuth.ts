import {
  Address,
  ExternalAuthId,
  Person,
  PersonId,
  PersonRepository,
  UniversityId,
} from "../../..";

export interface CreateStudentFromExternalAuthRequest {
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

  universityProgram: string | null;
  academicLevel: string | null;
  yearOfStudy: string | null;
}

export class CreateStudentFromExternalAuth {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: CreateStudentFromExternalAuthRequest): Promise<void> {
    const existing = await this.repository.findByExternalAuthId(
      request.externalAuthId,
    );

    if (existing) {
      throw new Error("External account already linked");
    }

    const person = Person.createStudentFromExternalAuth(
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
      request.universityProgram,
      request.academicLevel,
      request.yearOfStudy,
    );

    await this.repository.save(person);
  }
}
