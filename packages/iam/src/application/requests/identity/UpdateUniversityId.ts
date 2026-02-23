import { PersonId, UniversityId, PersonRepository } from "../../..";

export interface UpdateUniversityIdRequest {
  personId: PersonId;
  universityId: UniversityId;
}

export class UpdateUniversityId {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateUniversityIdRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateUniversityId(request.universityId);

    await this.repository.save(person);
  }
}
