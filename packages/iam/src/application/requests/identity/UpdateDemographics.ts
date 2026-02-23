import { PersonId, PersonRepository } from "../../..";

export interface UpdateDemographicsRequest {
  personId: PersonId;
  pronouns: string | null;
  sex: string | null;
  gender: string | null;
  birthday: Date | null;
}

export class UpdateDemographics {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateDemographicsRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateDemographics(
      request.pronouns,
      request.sex,
      request.gender,
      request.birthday,
    );

    await this.repository.save(person);
  }
}
