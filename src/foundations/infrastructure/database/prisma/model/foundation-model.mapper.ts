import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Foundation } from '@prisma/client';
import { FoundationEntity } from '../../../../domain/entities/foundation.entity';

export class FoundationModelMapper {
  static toEntity(model: Foundation) {
    const data = {
      project: model.project,
      revision: model.revision,
      description: model.description,
      excavation_volume: model.excavation_volume,
      concrete_volume: model.concrete_volume,
      backfill_volume: model.backfill_volume,
      steel_volume: model.steel_volume,
      createdAt: model.createdAt,
    };

    try {
      return new FoundationEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
