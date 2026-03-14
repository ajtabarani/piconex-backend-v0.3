import { Pool } from "mysql2";
import { PersonRepository } from "../../domain";

export class PersonRepositoryImpl implements PersonRepository {
    constructor(private readonly pool: Pool) {}
}