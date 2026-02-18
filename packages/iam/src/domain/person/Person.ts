import {
  Address,
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
    private preferredName: string | null,
    private middleName: string | null,
    private lastName: string,

    private email: string,
    private phoneNumber: string | null,

    private pronouns: string | null,
    private sex: string | null,
    private gender: string | null,

    private birthday: Date | null,

    private address: Address | null,

    roles: Role[],
    state: PersonState,

    private readonly createdAt: Date,
    private updatedAt: Date,
    private importJobId: string | null,
  ) {
    if (roles.length === 0) {
      throw new Error("Person must have at least one role");
    }

    if (!firstName || !lastName) {
      throw new Error("First and last name are required");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    this.roles = new Set(roles);
    this.state = state;
  }

  // Factories
  static createImportedStudent(
    personId: PersonId,
    universityId: string,
    firstName: string,
    preferredName: string | null,
    middleName: string | null,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    pronouns: string | null,
    sex: string | null,
    gender: string | null,
    birthday: Date | null,
    address: Address | null,
    universityProgram: string | null,
    academicLevel: string | null,
    yearOfStudy: string | null,
    importJobId: string,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      null,
      universityId,
      firstName,
      preferredName,
      middleName,
      lastName,
      email,
      phoneNumber,
      pronouns,
      sex,
      gender,
      birthday,
      address,
      [Role.Student],
      PersonState.Active,
      now,
      now,
      importJobId,
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
    universityId: string | null,
    firstName: string,
    preferredName: string | null,
    middleName: string | null,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    pronouns: string | null,
    sex: string | null,
    gender: string | null,
    birthday: Date | null,
    address: Address | null,
    universityProgram: string | null,
    academicLevel: string | null,
    yearOfStudy: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      externalAuthId,
      universityId,
      firstName,
      preferredName,
      middleName,
      lastName,
      email,
      phoneNumber,
      pronouns,
      sex,
      gender,
      birthday,
      address,
      [Role.Student],
      PersonState.Active,
      now,
      now,
      null,
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
    preferredName: string | null,
    middleName: string | null,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    pronouns: string | null,
    sex: string | null,
    gender: string | null,
    birthday: Date | null,
    address: Address | null,
    department: string | null,
    title: string | null,
    importJobId: string,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      null,
      universityId,
      firstName,
      preferredName,
      middleName,
      lastName,
      email,
      phoneNumber,
      pronouns,
      sex,
      gender,
      birthday,
      address,
      [Role.Faculty],
      PersonState.Active,
      now,
      now,
      importJobId,
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
    universityId: string | null,
    firstName: string,
    preferredName: string | null,
    middleName: string | null,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    pronouns: string | null,
    sex: string | null,
    gender: string | null,
    birthday: Date | null,
    address: Address | null,
    department: string | null,
    title: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      externalAuthId,
      universityId,
      firstName,
      preferredName,
      middleName,
      lastName,
      email,
      phoneNumber,
      pronouns,
      sex,
      gender,
      birthday,
      address,
      [Role.Faculty],
      PersonState.Active,
      now,
      now,
      null,
    );

    person.facultyProfile = new FacultyProfile(
      department,
      title,
      RoleState.Active,
      now,
    );

    return person;
  }

  static createAdmin(
    personId: PersonId,
    externalAuthId: string,
    universityId: string | null,
    firstName: string,
    preferredName: string | null,
    middleName: string | null,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    pronouns: string | null,
    sex: string | null,
    gender: string | null,
    birthday: Date | null,
    address: Address | null,
    jobTitle: string | null,
    department: string | null,
    specialization: string | null,
  ): Person {
    const now = new Date();

    const person = new Person(
      personId,
      externalAuthId,
      universityId,
      firstName,
      preferredName,
      middleName,
      lastName,
      email,
      phoneNumber,
      pronouns,
      sex,
      gender,
      birthday,
      address,
      [Role.Admin],
      PersonState.Active,
      now,
      now,
      null,
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
