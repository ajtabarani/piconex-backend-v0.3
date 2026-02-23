import { PersonId, PersonRepository, Role } from "../..";

export interface TransferSuperAdminOwnershipRequest {
  newSuperAdminId: PersonId;
}

export class TransferSuperAdminOwnership {
  constructor(private readonly repository: PersonRepository) {}

  async execute(request: TransferSuperAdminOwnershipRequest): Promise<void> {
    const currentSuperAdmin = await this.repository.loadSuperAdmin();

    const newSuperAdmin = await this.repository.load(request.newSuperAdminId);

    if (newSuperAdmin.isSystemSuperAdmin()) {
      throw new Error("Target person is already super admin");
    }

    if (!newSuperAdmin.hasRole(Role.Admin)) {
      throw new Error("Super admin must be an admin");
    }

    currentSuperAdmin.revokeSuperAdmin();
    newSuperAdmin.makeSuperAdmin();

    await this.repository.save(currentSuperAdmin);
    await this.repository.save(newSuperAdmin);
  }
}
