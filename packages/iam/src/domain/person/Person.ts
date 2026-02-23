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
    private externalAuthId: string | null,
    private universityId: string | null,
    private isSuperAdmin: boolean,

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
    this.isSuperAdmin = isSuperAdmin;
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
      false,
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

    person.studentProfile = StudentProfile.create(
      universityProgram,
      academicLevel,
      yearOfStudy,
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
      false,
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

    person.studentProfile = StudentProfile.create(
      universityProgram,
      academicLevel,
      yearOfStudy,
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
      false,
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

    person.facultyProfile = FacultyProfile.create(department, title);

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
      false,
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

    person.facultyProfile = FacultyProfile.create(department, title);

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
      false,
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

    person.adminProfile = AdminProfile.create(
      jobTitle,
      department,
      specialization,
    );

    return person;
  }

  static restore(
    personId: PersonId,
    externalAuthId: string | null,
    universityId: string | null,
    isSuperAdmin: boolean,

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

    roles: Role[],
    state: PersonState,

    createdAt: Date,
    updatedAt: Date,
    importJobId: string | null,

    studentProfile?: StudentProfile,
    facultyProfile?: FacultyProfile,
    adminProfile?: AdminProfile,
  ): Person {
    const person = new Person(
      personId,
      externalAuthId,
      universityId,
      isSuperAdmin,
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
      roles,
      state,
      createdAt,
      updatedAt,
      importJobId,
    );

    person.studentProfile = studentProfile;
    person.facultyProfile = facultyProfile;
    person.adminProfile = adminProfile;

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

  assignStudentRole(
    universityProgram: string | null,
    academicLevel: string | null,
    yearOfStudy: string | null,
  ): void {
    if (this.studentProfile) {
      throw new Error("Student profile already exists");
    }

    this.studentProfile = StudentProfile.create(
      universityProgram,
      academicLevel,
      yearOfStudy,
    );

    this.roles.add(Role.Student);
    this.updatedAt = new Date();
  }

  deactivateStudentRole(): void {
    if (!this.studentProfile) throw new Error("Not a student");
    this.studentProfile.deactivate();
    this.updatedAt = new Date();
  }

  reactivateStudentRole(): void {
    if (!this.studentProfile) throw new Error("Not a student");
    this.studentProfile.activate();
    this.updatedAt = new Date();
  }

  updateStudentProfile(
    universityProgram: string | null,
    academicLevel: string | null,
    yearOfStudy: string | null,
  ): void {
    if (!this.studentProfile) {
      throw new Error("Person is not a student");
    }

    this.studentProfile.updateAcademicInfo(
      universityProgram,
      academicLevel,
      yearOfStudy,
    );

    this.updatedAt = new Date();
  }

  assignAdminRole(
    jobTitle: string | null,
    department: string | null,
    specialization: string | null,
  ): void {
    if (this.adminProfile) {
      throw new Error("Admin profile already exists");
    }

    this.adminProfile = AdminProfile.create(
      jobTitle,
      department,
      specialization,
    );

    this.roles.add(Role.Admin);
    this.updatedAt = new Date();
  }

  deactivateAdminRole(): void {
    if (!this.adminProfile) throw new Error("Not a admin");
    this.adminProfile.deactivate();
    this.updatedAt = new Date();
  }

  reactivateAdminRole(): void {
    if (!this.adminProfile) throw new Error("Not a admin");
    this.adminProfile.activate();
    this.updatedAt = new Date();
  }

  updateAdminProfile(
    jobTitle: string | null,
    department: string | null,
    specialization: string | null,
  ): void {
    if (!this.adminProfile) {
      throw new Error("Person is not an admin");
    }

    this.adminProfile.updateJobInfo(jobTitle, department, specialization);
    this.updatedAt = new Date();
  }

  assignFacultyRole(department: string | null, title: string | null): void {
    if (this.facultyProfile) {
      throw new Error("Faculty profile already exists");
    }

    this.facultyProfile = FacultyProfile.create(department, title);

    this.roles.add(Role.Faculty);
    this.updatedAt = new Date();
  }

  deactivateFacultyRole(): void {
    if (!this.facultyProfile) throw new Error("Not a faculty");
    this.facultyProfile.deactivate();
    this.updatedAt = new Date();
  }

  reactivateFacultyRole(): void {
    if (!this.facultyProfile) throw new Error("Not a faculty");
    this.facultyProfile.activate();
    this.updatedAt = new Date();
  }

  updateFacultyProfile(department: string | null, title: string | null): void {
    if (!this.facultyProfile) {
      throw new Error("Person is not faculty");
    }

    this.facultyProfile.updateProfessionalInfo(department, title);
    this.updatedAt = new Date();
  }

  makeSuperAdmin(): void {
    if (this.isSuperAdmin) return;

    this.isSuperAdmin = true;
    this.updatedAt = new Date();
  }

  revokeSuperAdmin(): void {
    if (!this.isSuperAdmin) return;

    this.isSuperAdmin = false;
    this.updatedAt = new Date();
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

  isSystemSuperAdmin(): boolean {
    return this.isSuperAdmin;
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
