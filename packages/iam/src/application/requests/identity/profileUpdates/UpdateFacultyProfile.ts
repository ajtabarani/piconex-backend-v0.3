import {
  PersonAuthorizationSnapshot,
  PersonPolicy,
  PolicyGuard,
} from "../../..";
import { PersonId, PersonRepository } from "../../../..";

export interface UpdateFacultyProfileRequest {
  actor: PersonAuthorizationSnapshot;
  personId: PersonId;
  department: string | null;
  title: string | null;
}

export class UpdateFacultyProfile {
  constructor(
    private readonly repository: PersonRepository,
    private readonly policy: PersonPolicy,
    private readonly guard: PolicyGuard,
  ) {}

  async execute(request: UpdateFacultyProfileRequest): Promise<void> {
    this.guard.ensure(this.policy.hasAdministrativeAuthority(request.actor));

    const person = await this.repository.load(request.personId);

    person.updateFacultyProfile(request.department, request.title);

    await this.repository.save(person);
  }
}
