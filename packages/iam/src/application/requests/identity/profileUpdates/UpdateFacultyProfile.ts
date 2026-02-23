import { PersonId, PersonRepository } from "../../../..";

export interface UpdateFacultyProfileRequest {
  personId: PersonId;
  department: string | null;
  title: string | null;
}

export class UpdateFacultyProfile {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateFacultyProfileRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateFacultyProfile(request.department, request.title);

    await this.repository.save(person);
  }
}
