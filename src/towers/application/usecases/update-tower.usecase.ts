import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import {
  CoordinateProps,
  CoordinatesVO,
} from '@/towers/domain/entities/coordinates-vo';
import { Embargo } from '@/towers/domain/entities/towers.entity';
import { FoundationRepository } from '../../../foundations/domain/repositories/foundation.repository';

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
    constructor(
      private repository: TowerRepository.Repository,
      private foundationRepo: FoundationRepository.Repository,
    ) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      const coordinates = CoordinatesVO.create(input.coordinates);

      entity.update({ ...input, coordinates });
      this.repository.update(entity);

      const foundations = await Promise.all(
        input.foundations.map(id => this.foundationRepo.findById(id)),
      );
      return TowerOutputMapper.toOutput(entity, foundations);
    }
  }
}
