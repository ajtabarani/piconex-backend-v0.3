import { RoleState } from "./RoleState";

export class FacultyProfile {
  private state: RoleState;
  private stateChangedAt: Date;

  constructor(
    private department: string | null,
    private title: string | null,
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

  getDepartment(): string | null {
    return this.department;
  }

  getTitle(): string | null {
    return this.title;
  }

  getStateChangedAt(): Date {
    return this.stateChangedAt;
  }
}
