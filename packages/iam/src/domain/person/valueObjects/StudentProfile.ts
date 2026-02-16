import { RoleState } from "./RoleState";

export class StudentProfile {
  private state: RoleState;
  private stateChangedAt: Date;

  constructor(
    private universityProgram: string | null,
    private academicLevel: string | null,
    private yearOfStudy: string | null,
    state: RoleState,
    stateChangedAt: Date,
  ) {
    this.state = state;
    this.stateChangedAt = stateChangedAt;
  }

  activate(): void {
    if (this.state === RoleState.Active) return;

    this.state = RoleState.Active;
    this.stateChangedAt = new Date();
  }

  deactivate(): void {
    if (this.state === RoleState.Inactive) return;

    this.state = RoleState.Inactive;
    this.stateChangedAt = new Date();
  }

  isActive(): boolean {
    return this.state === RoleState.Active;
  }
}
