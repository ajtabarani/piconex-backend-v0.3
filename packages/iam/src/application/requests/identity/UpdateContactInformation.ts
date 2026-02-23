import { PersonId, Address, PersonRepository } from "../../..";

export interface UpdateContactInformationRequest {
  personId: PersonId;
  phoneNumber: string | null;
  address: Address | null;
}

export class UpdateContactInformation {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: UpdateContactInformationRequest): Promise<void> {
    const person = await this.repository.load(request.personId);

    person.updateContactInformation(request.phoneNumber, request.address);

    await this.repository.save(person);
  }
}
