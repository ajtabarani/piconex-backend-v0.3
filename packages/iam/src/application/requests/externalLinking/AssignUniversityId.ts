import { PersonId, UniversityId, PersonRepository } from "../../..";

export interface AssignUniversityIdRequest {
  personId: PersonId;
  universityId: UniversityId;
}

export class AssignUniversityId {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: AssignUniversityIdRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.assignUniversityId(request.universityId);

    await this.repository.save(person);
  }
}
