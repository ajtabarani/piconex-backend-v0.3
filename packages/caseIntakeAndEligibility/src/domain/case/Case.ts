import { CaseId } from "../shared";

export class Case {
  private readonly caseId: CaseId;
  private readonly studentId: StudentId;

  private intake?: Intake;
  private notes: CaseNote[];
  private disabilities: CaseDisability[];
  private assignments: CaseAssignment[];

  private state: CaseState;
  private stateChangedAt: Date;
  private closedStatus?: ClosedStatus;

  private readonly openedAt: Date;
  private readonly openedBy: PersonId;

  private closedAt?: Date;
  private closedBy?: PersonId;

  private reopenedAt?: Date;
  private reopenedBy?: PersonId;
  private reopenedReason?: string;

  private constructor(caseId: CaseId) {
    this.caseId = caseId;
  }

  static createNew(caseId: CaseId): Case {
    const caseEntity = new Case(caseId);

    return caseEntity;
  }

  static restore(caseId: CaseId): Case {
    const caseEntity = new Case(caseId);

    return caseEntity;
  }
}
