import { PersonId, Role } from "..";

export default class Person {
  private roles: Set<Role>;

  constructor(
    private readonly personId: PersonId,
    private readonly externalAuthId: string,
    roles: Role[],
    private active: boolean = true,
  ) {
    this.roles = new Set(roles);
  }

  // ===== Identity =====

  getId(): PersonId {
    return this.personId;
  }

  getExternalAuthId(): string {
    return this.externalAuthId;
  }

  isActive(): boolean {
    return this.active;
  }

  deactivate(): void {
    this.active = false;
  }

  // ===== Roles =====

  hasRole(role: Role): boolean {
    return this.roles.has(role);
  }

  getRoles(): readonly Role[] {
    return Array.from(this.roles);
  }

  assignRole(role: Role): void {
    if (this.roles.has(role)) {
      throw new Error("Role already assigned");
    }

    this.roles.add(role);
  }

  removeRole(role: Role): void {
    if (!this.roles.has(role)) {
      throw new Error("Role not assigned");
    }

    this.roles.delete(role);

    if (this.roles.size === 0) {
      throw new Error("Person must have at least one role");
    }
  }
}
