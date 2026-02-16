import { PersonId, PersonRepository, Role } from ".";

export class AuthorizationService {
  constructor(private readonly personRepository: PersonRepository) {}

  async authorize(actorId: PersonId, requiredRoles: Role[]): Promise<void> {
    const person = await this.personRepository.load(actorId);

    if (!person.isActive()) {
      throw new Error("Inactive user");
    }

    const allowed = requiredRoles.some((role) => person.hasRole(role));

    if (!allowed) {
      throw new Error("Forbidden");
    }
  }
}
