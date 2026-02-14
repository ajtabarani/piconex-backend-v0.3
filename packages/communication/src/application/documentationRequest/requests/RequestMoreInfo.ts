import {
  DocumentationRequestRepository,
  DocumentationRequestId,
  PersonId,
} from "../../..";

export interface RequestMoreInfoRequest {
  documentationRequestId: DocumentationRequestId;
  actorId: PersonId;
}

export class RequestMoreInfo {
  constructor(private readonly repository: DocumentationRequestRepository) {}

  async execute(request: RequestMoreInfoRequest): Promise<void> {
    const docRequest = await this.repository.load(
      request.documentationRequestId,
    );

    docRequest.requestMoreInfo(request.actorId);

    await this.repository.save(docRequest);
  }
}
