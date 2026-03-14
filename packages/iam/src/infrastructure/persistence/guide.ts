import {connect} from "other-module"

export class Main {


    const dsn = "asdfasdf"
    const db = connect(dsn)
    const person_repository = new PersonRepositoryImpl(db);
    const person_policy = new PersonPolicy();
    const policy_guard = new PolicyGuard();
    
    const CreateAdminHandler = new CreateAdmin(person_repository, person_policy, policy_guard)
}

REQUIREMENTS:
Constructor should take in a database object.
Each function within PersonRepository should have an implementation that follows the definition