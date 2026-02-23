import { Address, Person, PersonId, PersonRepository } from "../../..";

export interface CreateImportedStudentRequest {
  personId: PersonId;
  universityId: string;

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

  importJobId: string;
}

export class CreateImportedStudent {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: CreateImportedStudentRequest): Promise<void> {
    const person = Person.createImportedStudent(
      request.personId,
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
      request.importJobId,
    );

    await this.repository.save(person);
  }
}
