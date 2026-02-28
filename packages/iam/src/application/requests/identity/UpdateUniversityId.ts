import { PersonAuthorizationSnapshot, PersonPolicy, PolicyGuard } from "../..";
import { PersonId, UniversityId, PersonRepository } from "../../..";

export interface UpdateUniversityIdRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  universityId: UniversityId;
}

export class UpdateUniversityId {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateUniversityIdRequest): Promise<void> {
    this.guard.ensure(this.policy.canManageStudentDomain(request.actor));

    const person = await this.repository.load(request.personId);

    person.updateUniversityId(request.universityId);

    await this.repository.save(person);
  }
}
