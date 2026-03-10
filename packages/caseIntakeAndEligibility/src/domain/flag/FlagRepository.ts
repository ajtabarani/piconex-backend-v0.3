import { FlagId } from "../shared";
import Flag from "./Flag";

export interface CaseRepository {
  load(id: FlagId): Promise<Flag>;
  save(thread: Flag): Promise<void>;
}
