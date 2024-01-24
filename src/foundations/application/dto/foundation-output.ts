import { FoundationEntity } from '../../domain/entities/foundation.entity';

export type FoundationOutput = {
  id: string;
  project: string;
  revision: string;
  description: string;
  excavation_volume: number;
  concrete_volume: number;
  backfill_volume: number;
  steel_volume: number;
  createdAt: Date;
};

export class FoundationOutputMapper {
  static toOutput(entity: FoundationEntity): FoundationOutput {
    return entity.toJSON();
  }
}
