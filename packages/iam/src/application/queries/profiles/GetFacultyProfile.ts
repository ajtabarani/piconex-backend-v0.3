import { PersonId } from "../../..";
import { FacultyProfileDTO, PersonReadRepository } from "..";

export interface GetFacultyProfileRequest {
  personId: PersonId;
}

export class GetFacultyProfile {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(
    request: GetFacultyProfileRequest,
  ): Promise<FacultyProfileDTO | null> {
    return this.repository.findFacultyProfile(request.personId);
  }
}
