import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import {
  CoordinateProps,
  CoordinatesVO,
} from '@/towers/domain/entities/coordinates-vo';
import { Embargo } from '@/towers/domain/entities/towers.entity';

export namespace UpdateTowerUseCase {
  export type Input = {
    id: string;
    code: number;
    tower: string;
    type: string;
    coordinates: CoordinateProps;
    distance?: number;
    height?: number;
    weight?: number;
    embargo?: Embargo;
    foundations?: string[];
  };

  export type Output = TowerOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TowerRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      const coordinates = CoordinatesVO.create(input.coordinates);
      entity.update({ ...input, coordinates });
      this.repository.update(entity);
      return TowerOutputMapper.toOutput(entity);
    }
  }
}
