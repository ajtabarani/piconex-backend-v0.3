import { PersonId } from "../../..";
import { AdminProfileDTO, PersonReadRepository } from "..";

export interface GetAdminProfileRequest {
  personId: PersonId;
}

export class GetAdminProfile {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(
    request: GetAdminProfileRequest,
  ): Promise<AdminProfileDTO | null> {
    return this.repository.findAdminProfile(request.personId);
  }
}
