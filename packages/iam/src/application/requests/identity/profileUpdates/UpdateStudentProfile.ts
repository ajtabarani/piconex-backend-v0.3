import { PersonId, PersonRepository } from "../../../..";

export interface UpdateStudentProfileRequest {
  personId: PersonId;
  universityProgram: string | null;
  academicLevel: string | null;
  yearOfStudy: string | null;
}

export class UpdateStudentProfile {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateStudentProfileRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateStudentProfile(
      request.universityProgram,
      request.academicLevel,
      request.yearOfStudy,
    );

    await this.repository.save(person);
  }
}
