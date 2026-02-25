import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, UniversityId, PersonRepository } from "../../../..";

export interface AssignUniversityIdRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  universityId: UniversityId;
}

export class AssignUniversityId {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: AssignUniversityIdRequest): Promise<void> {
    // Unfinished

    const person = await this.repository.load(request.personId);

    person.assignUniversityId(request.universityId);

    await this.repository.save(person);
  }
}
