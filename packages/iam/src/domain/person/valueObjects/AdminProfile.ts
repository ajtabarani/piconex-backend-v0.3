import { RoleState } from "./RoleState";

export class AdminProfile {
  private state: RoleState;
  private stateChangedAt: Date;

  constructor(
    private jobTitle: string | null,
    private department: string | null,
    private specialization: string | null,
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

  getJobTitle(): string | null {
    return this.jobTitle;
  }

  getDepartment(): string | null {
    return this.department;
  }

  getSpecialization(): string | null {
    return this.specialization;
  }

  getStateChangedAt(): Date {
    return this.stateChangedAt;
  }
}
