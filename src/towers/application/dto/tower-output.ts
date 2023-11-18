import { TowerEntity, Embargo } from '@/towers/domain/entities/towers.entity';
import { CoordinateProps } from '@/towers/domain/entities/coordinates-vo';

export type TowerOutput = {
  id: string;
  code: number;
  tower: string;
  type: string;
  coordinates: CoordinateProps;
  distance: number | null;
  height: number | null;
  weight: number | null;
  type_of_foundation_A: string | null;
  type_of_foundation_B: string | null;
  type_of_foundation_C: string | null;
  type_of_foundation_D: string | null;
  type_of_foundation_MC: string | null;
  embargo: Embargo | null;
  createdAt: Date;
};

export class TowerOutputMapper {
  static toOutput(entity: TowerEntity): TowerOutput {
    return entity.toJSON();
  }
}
