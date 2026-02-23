import { PersonId, Address, PersonRepository, Person } from "../../..";

export interface CreateImportedFacultyRequest {
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

  department: string | null;
  title: string | null;

  importJobId: string;
}

export class CreateImportedFaculty {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: CreateImportedFacultyRequest): Promise<void> {
    const person = Person.createImportedFaculty(
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
      request.department,
      request.title,
      request.importJobId,
    );

    await this.repository.save(person);
  }
}
