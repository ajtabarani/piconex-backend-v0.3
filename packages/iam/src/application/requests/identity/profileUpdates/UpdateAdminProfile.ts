import { PersonId, PersonRepository } from "../../../..";

export interface UpdateAdminProfileRequest {
  personId: PersonId;
  jobTitle: string | null;
  department: string | null;
  specialization: string | null;
}

export class UpdateAdminProfile {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateAdminProfileRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateAdminProfile(
      request.jobTitle,
      request.department,
      request.specialization,
    );

    await this.repository.save(person);
  }
}
