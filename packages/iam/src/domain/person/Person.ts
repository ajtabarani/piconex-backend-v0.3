import {
  AdminProfile,
  FacultyProfile,
  PersonId,
  PersonState,
  Role,
  RoleState,
  StudentProfile,
} from ".";

export class Person {
  private roles: Set<Role>;
  private state: PersonState;

  private studentProfile?: StudentProfile;
  private adminProfile?: AdminProfile;
  private facultyProfile?: FacultyProfile;

  private constructor(
    private readonly personId: PersonId,
    private readonly externalAuthId: string | null,
    private universityId: string | null,
    private firstName: string,
    private lastName: string,
    private email: string,
    roles: Role[],
    state: PersonState,
    private createdAt: Date,
    private updatedAt: Date,
  ) {
    if (roles.length === 0) {
      throw new Error("Person must have at least one role");
    }

    this.roles = new Set(roles);
    this.state = state;
  }

  // Factories
  static createImportedStudent(
    personId: PersonId,
    universityId: string,
    firstName: string,
    lastName: string,
    email: string,
    universityProgram: string | null,
    academicLevel: string | null,
    yearOfStudy: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      null,
      universityId,
      firstName,
      lastName,
      email,
      [Role.Student],
      PersonState.Active,
      now,
      now,
    );

    person.studentProfile = new StudentProfile(
      universityProgram,
      academicLevel,
      yearOfStudy,
      RoleState.Active,
      now,
    );

    return person;
  }

  static createStudentFromExternalAuth(
    personId: PersonId,
    externalAuthId: string,
    firstName: string,
    lastName: string,
    email: string,
    universityProgram: string | null,
    academicLevel: string | null,
    yearOfStudy: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      externalAuthId,
      null,
      firstName,
      lastName,
      email,
      [Role.Student],
      PersonState.Active,
      now,
      now,
    );

    person.studentProfile = new StudentProfile(
      universityProgram,
      academicLevel,
      yearOfStudy,
      RoleState.Active,
      now,
    );

    return person;
  }

  static createImportedFaculty(
    personId: PersonId,
    universityId: string,
    firstName: string,
    lastName: string,
    email: string,
    department: string | null,
    title: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      null,
      universityId,
      firstName,
      lastName,
      email,
      [Role.Faculty],
      PersonState.Active,
      now,
      now,
    );

    person.facultyProfile = new FacultyProfile(
      department,
      title,
      RoleState.Active,
      now,
    );

    return person;
  }

  static createFacultyFromExternalAuth(
    personId: PersonId,
    externalAuthId: string,
    firstName: string,
    lastName: string,
    email: string,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      externalAuthId,
      null,
      firstName,
      lastName,
      email,
      [Role.Faculty],
      PersonState.Active,
      now,
      now,
    );

    person.facultyProfile = new FacultyProfile(
      null,
      null,
      RoleState.Active,
      now,
    );

    return person;
  }

  static createAdmin(
    personId: PersonId,
    externalAuthId: string,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string | null,
    department: string | null,
    specialization: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      externalAuthId,
      null,
      firstName,
      lastName,
      email,
      [Role.Admin],
      PersonState.Active,
      now,
      now,
    );

    person.adminProfile = new AdminProfile(
      jobTitle,
      department,
      specialization,
      RoleState.Active,
      now,
    );

    return person;
  }

  // Commands
  deactivate(): void {
    this.state = PersonState.Inactive;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.state = PersonState.Active;
    this.updatedAt = new Date();
  }

  assignStudentProfile(profile: StudentProfile): void {
    if (this.studentProfile) {
      throw new Error("Student profile already exists");
    }

    this.roles.add(Role.Student);
    this.studentProfile = profile;
  }

  assignAdminProfile(profile: AdminProfile): void {
    if (this.adminProfile) {
      throw new Error("Admin profile already exists");
    }

    this.roles.add(Role.Admin);
    this.adminProfile = profile;
  }

  assignFacultyProfile(profile: FacultyProfile): void {
    if (this.facultyProfile) {
      throw new Error("Faculty profile already exists");
    }

    this.roles.add(Role.Faculty);
    this.facultyProfile = profile;
  }

  // Read Interfaces
  getId(): PersonId {
    return this.personId;
  }

  getExternalAuthId(): string | null {
    return this.externalAuthId;
  }

  isActive(): boolean {
    return this.state === PersonState.Active;
  }

  hasRole(role: Role): boolean {
    return this.roles.has(role);
  }

  getStudentProfile(): StudentProfile {
    if (!this.studentProfile) {
      throw new Error("Person is not a student");
    }
    return this.studentProfile;
  }

  getAdminProfile(): AdminProfile {
    if (!this.adminProfile) {
      throw new Error("Person is not an admin");
    }
    return this.adminProfile;
  }

  getFacultyProfile(): FacultyProfile {
    if (!this.facultyProfile) {
      throw new Error("Person is not faculty");
    }
    return this.facultyProfile;
  }
}
