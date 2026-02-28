import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PersonReadRepository,
  PolicyGuard,
} from "../..";
import { PersonId, UniversityId, PersonRepository } from "../../..";

export interface UpdateUniversityIdRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  universityId: UniversityId;
}

export class UpdateUniversityId {
  constructor(
    private readonly repository: PersonRepository,
    private readonly readRepository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateUniversityIdRequest): Promise<void> {
    const target = await this.readRepository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) throw new Error("Person not found");

    this.guard.ensure(this.policy.canManagePerson(request.actor, target));
    const person = await this.repository.load(request.personId);

    person.updateUniversityId(request.universityId);

    await this.repository.save(person);
  }
}
