import { PersonId } from "../../..";
import { PersonReadRepository } from "..";

export interface CheckPersonIsActiveRequest {
  personId: PersonId;
}

export class CheckPersonIsActive {
  constructor(private readonly repository: PersonReadRepository) {}

  async execute(request: CheckPersonIsActiveRequest): Promise<boolean> {
    const snapshot = await this.repository.findAuthorizationSnapshot(
      request.personId,
    );

    return snapshot?.isActive ?? false;
  }
}
