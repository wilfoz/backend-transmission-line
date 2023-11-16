import { ValidationError } from '@/shared/domain/errors/validation-error';
import {
  CoordinateProps,
  CoordinatesVO,
} from '@/towers/domain/entities/coordinates-vo';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { Tower } from '@prisma/client';

type Embargo = 'RELEASE' | 'EMBARGOES';

export class TowerModelMapper {
  static toEntity(model: Tower) {
    const data = {
      code: model.code,
      tower: model.tower,
      type: model.type,
      coordinates: model.coordinates,
      distance: model.distance,
      height: model.height,
      weight: model.weight,
      type_of_foundation_A: model.type_of_foundation_A,
      type_of_foundation_B: model.type_of_foundation_B,
      type_of_foundation_C: model.type_of_foundation_C,
      type_of_foundation_D: model.type_of_foundation_D,
      type_of_foundation_MC: model.type_of_foundation_MC,
      embargo: model.embargo,
      createdAt: model.createdAt,
    };

    try {
      const { coordinates, embargo } = data;
      const coord = new CoordinatesVO(coordinates as CoordinateProps);
      const transformedData = {
        ...data,
        coordinates: coord,
        embargo: embargo as Embargo,
      };
      return new TowerEntity(transformedData, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
