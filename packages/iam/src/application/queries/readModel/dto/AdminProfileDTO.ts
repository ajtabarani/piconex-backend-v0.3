export type AdminProfileDTO = {
  personId: string;
  jobTitle: string | null;
  department: string | null;
  specialization: string | null;

  isActive: boolean;
  stateChangedAt: Date;
};
