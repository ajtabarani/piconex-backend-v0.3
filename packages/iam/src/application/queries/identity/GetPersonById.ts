import { PersonId } from "../../..";
import { PersonDTO, PersonReadRepository } from "..";

export interface GetPersonByIdRequest {
  personId: PersonId;
}

export class GetPersonById {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(request: GetPersonByIdRequest): Promise<PersonDTO | null> {
    return this.repository.findById(request.personId);
  }
}
