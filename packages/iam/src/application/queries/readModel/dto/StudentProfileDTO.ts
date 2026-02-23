export type StudentProfileDTO = {
  personId: string;
  universityProgram: string | null;
  academicLevel: string | null;
  yearOfStudy: string | null;

  isActive: boolean;
  stateChangedAt: Date;
};
