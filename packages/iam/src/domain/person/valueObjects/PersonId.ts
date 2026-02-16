abstract class StringValueObject {
  protected constructor(protected readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error(`${this.constructor.name} cannot be empty`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: StringValueObject): boolean {
    return this.value === other.value;
  }
}

export class PersonId extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): PersonId {
    return new PersonId(value);
  }
}
