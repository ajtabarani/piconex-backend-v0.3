import { Person, PersonId } from "..";

export interface PersonRepository {
  load(id: PersonId): Promise<Person>;
  findById(personId: PersonId): Promise<Person | null>;
  findByExternalAuthId(externalAuthId: string): Promise<Person | null>;
  save(thread: Person): Promise<void>;
}
