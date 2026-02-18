export class Address {
  constructor(
    private readonly addressLine1: string | null,
    private readonly addressLine2: string | null,
    private readonly city: string | null,
    private readonly geographicalState: string | null,
    private readonly zipCode: string | null,
    private readonly country: string | null,
  ) {}

  getAddressLine1(): string | null {
    return this.addressLine1;
  }

  getAddressLine2(): string | null {
    return this.addressLine2;
  }

  getCity(): string | null {
    return this.city;
  }

  getGeographicalState(): string | null {
    return this.geographicalState;
  }

  getZipCode(): string | null {
    return this.zipCode;
  }

  getCountry(): string | null {
    return this.country;
  }
}
