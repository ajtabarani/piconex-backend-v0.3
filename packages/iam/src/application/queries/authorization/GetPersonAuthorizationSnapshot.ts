import { PersonId } from "../../..";
import { PersonAuthorizationSnapshot, PersonReadRepository } from "..";

export interface GetPersonAuthorizationSnapshotRequest {
  personId: PersonId;
}

export class GetPersonAuthorizationSnapshot {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(
    request: GetPersonAuthorizationSnapshotRequest,
  ): Promise<PersonAuthorizationSnapshot | null> {
    return this.repository.findAuthorizationSnapshot(request.personId);
  }
}
