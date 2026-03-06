import { IntakeState } from "./IntakeState";

export class Intake {
  private state: IntakeState;
  private readonly submittedAt: Date;

  private constructor(submittedAt: Date) {
    this.state = IntakeState.Submitted;
    this.submittedAt = submittedAt;
  }

  static createNew(): Intake {
    return new Intake(new Date());
  }

  static restore(props: { state: IntakeState; submittedAt: Date }): Intake {
    const intake = new Intake(props.submittedAt);
    intake.state = props.state;
    return intake;
  }

  moveToUnderReview(): void {
    if (this.state !== IntakeState.Submitted) {
      throw new Error("Intake must be submitted to move under review");
    }

    this.state = IntakeState.UnderReview;
  }

  approve(): void {
    if (this.state !== IntakeState.UnderReview) {
      throw new Error("Only intakes under review can be approved");
    }

    this.state = IntakeState.Approved;
  }

  deny(): void {
    if (this.state !== IntakeState.UnderReview) {
      throw new Error("Only intakes under review can be denied");
    }

    this.state = IntakeState.Denied;
  }

  withdraw(): void {
    if (
      this.state !== IntakeState.Submitted &&
      this.state !== IntakeState.UnderReview
    ) {
      throw new Error(
        "Only submitted or under review intakes can be withdrawn",
      );
    }

    this.state = IntakeState.Withdrawn;
  }

  getState(): IntakeState {
    return this.state;
  }
}
