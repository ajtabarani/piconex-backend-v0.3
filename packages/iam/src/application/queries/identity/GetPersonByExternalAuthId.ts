import { ExternalAuthId } from "../../..";
import { PersonDTO, PersonReadRepository } from "..";

export interface GetPersonByExternalAuthIdRequest {
  externalAuthId: ExternalAuthId;
}

export class GetPersonByExternalAuthId {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(
    request: GetPersonByExternalAuthIdRequest,
  ): Promise<PersonDTO | null> {
    return this.repository.findByExternalAuthId(request.externalAuthId);
  }
}
