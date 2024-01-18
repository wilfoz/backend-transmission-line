import { ValidationError } from '@/shared/domain/errors/validation-error';
import {
  CoordinateProps,
  CoordinatesVO,
} from '@/towers/domain/entities/coordinates-vo';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { Foundation, Tower } from '@prisma/client';

type Embargo = 'RELEASE' | 'EMBARGOES';

export class TowerModelMapper {
  static toEntity(model: Required<{ foundations: Foundation[] } & Tower>) {
    const data = {
      code: model.code,
      tower: model.tower,
      type: model.type,
      coordinates: model.coordinates,
      distance: model.distance,
      height: model.height,
      weight: model.weight,
      embargo: model.embargo,
      foundations: model.foundations,
      createdAt: model.createdAt,
    };

    try {
      const { coordinates, embargo, foundations } = data;
      const coord = new CoordinatesVO(coordinates as CoordinateProps);
      const transformedData = {
        ...data,
        coordinates: coord,
        embargo: embargo as Embargo,
        foundations: foundations.map(foundation => foundation.id),
      };
      return new TowerEntity(transformedData, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
