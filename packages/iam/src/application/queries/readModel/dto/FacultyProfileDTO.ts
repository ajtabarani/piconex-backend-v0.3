export type FacultyProfileDTO = {
  personId: string;
  department: string | null;
  title: string | null;

  isActive: boolean;
  stateChangedAt: Date;
};
