import { PersonId } from "../../..";
import { PersonReadRepository, StudentProfileDTO } from "..";

export interface GetStudentProfileRequest {
  personId: PersonId;
}

export class GetStudentProfile {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(
    request: GetStudentProfileRequest,
  ): Promise<StudentProfileDTO | null> {
    return this.repository.findStudentProfile(request.personId);
  }
}
