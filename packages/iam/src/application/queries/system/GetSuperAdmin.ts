import { PersonDTO, PersonReadRepository } from "..";

export class GetSuperAdmin {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(): Promise<PersonDTO | null> {
    return this.repository.findSuperAdmin();
  }
}
