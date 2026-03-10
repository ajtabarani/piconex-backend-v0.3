import { StudentDisabilityId } from "../shared";
import StudentDisability from "./StudentDisability";

export interface DisabilityRepository {
  load(id: StudentDisabilityId): Promise<StudentDisability>;
  save(thread: StudentDisability): Promise<void>;
}
