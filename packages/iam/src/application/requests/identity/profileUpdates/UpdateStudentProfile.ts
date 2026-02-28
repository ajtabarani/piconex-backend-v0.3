import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PersonReadRepository,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface UpdateStudentProfileRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  universityProgram: string | null;
  academicLevel: string | null;
  yearOfStudy: string | null;
}

export class UpdateStudentProfile {
  constructor(
    private readonly repository: PersonRepository,
    private readonly readRepository: PersonReadRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateStudentProfileRequest): Promise<void> {
    const target = await this.readRepository.findAuthorizationSnapshot(
      request.personId,
    );

    if (!target) throw new Error("Person not found");

    this.guard.ensure(this.policy.canManagePerson(request.actor, target));

    const person = await this.repository.load(request.personId);

    person.updateStudentProfile(
      request.universityProgram,
      request.academicLevel,
      request.yearOfStudy,
    );

    await this.repository.save(person);
  }
}
