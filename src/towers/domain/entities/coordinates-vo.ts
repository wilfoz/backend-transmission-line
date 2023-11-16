import { InvalidTypeError } from '@/shared/domain/errors/invalid-type-error';
import ValueObject from '@/shared/domain/value-objects/value-object';

export type CoordinateProps = {
  latitude: string;
  longitude: string;
};

export class CoordinatesVO extends ValueObject<CoordinateProps> {
  constructor(value: CoordinateProps) {
    super(value);
    this.validate();
  }

  static create(value: CoordinateProps) {
    try {
      return new CoordinatesVO(value);
    } catch (error) {
      return error;
    }
  }

  private validate() {
    const isValid =
      typeof this.value.latitude === 'string' &&
      typeof this.value.longitude === 'string';
    if (!isValid) {
      throw new InvalidTypeError('Type is invalid');
    }
  }
}
