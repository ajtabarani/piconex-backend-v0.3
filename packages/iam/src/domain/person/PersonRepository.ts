import { PersonId } from "..";
import Person from "./Person";

export interface PersonRepository {
  load(id: PersonId): Promise<Person>;
  save(thread: Person): Promise<void>;
}
