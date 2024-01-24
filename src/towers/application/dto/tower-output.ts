import { TowerEntity, Embargo } from '@/towers/domain/entities/towers.entity';
import { CoordinateProps } from '@/towers/domain/entities/coordinates-vo';
import { FoundationEntity } from '../../../foundations/domain/entities/foundation.entity';

export type TowerFoundationOutput = {
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

export type TowerOutput = {
  id: string;
  code: number;
  tower: string;
  type: string;
  coordinates: CoordinateProps;
  distance: number | null;
  height: number | null;
  weight: number | null;
  foundations: TowerFoundationOutput[] | [];
  embargo: Embargo | null;
  createdAt: Date;
};

export class TowerOutputMapper {
  static toOutput(
    entity: TowerEntity,
    foundations: FoundationEntity[],
  ): TowerOutput {
    return {
      id: entity.id,
      code: entity.code,
      tower: entity.tower,
      type: entity.type,
      coordinates: entity.coordinates.value,
      distance: entity.distance,
      height: entity.height,
      weight: entity.weight,
      foundations: foundations.map(f => ({
        id: f.id,
        project: f.project,
        revision: f.revision,
        description: f.description,
        excavation_volume: f.excavation_volume,
        concrete_volume: f.concrete_volume,
        backfill_volume: f.backfill_volume,
        steel_volume: f.steel_volume,
        createdAt: f.createdAt,
      })),
      embargo: entity.embargo,
      createdAt: entity.createdAt,
    };
  }
}
