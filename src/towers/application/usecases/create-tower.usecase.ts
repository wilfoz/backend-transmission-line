import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  CoordinateProps,
  CoordinatesVO,
} from '@/towers/domain/entities/coordinates-vo';
import { TowerEntity, Embargo } from '@/towers/domain/entities/towers.entity';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FoundationRepository } from '../../../foundations/domain/repositories/foundation.repository';

export namespace CreateTowerUseCase {
  export type Input = {
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
      const coordinates = CoordinatesVO.create(input.coordinates);
      try {
        const entity = new TowerEntity({
          ...input,
          coordinates,
        });
        await this.repository.insert(entity);

        const foundations = await Promise.all(
          input.foundations.map(id => this.foundationRepo.findById(id)),
        );

        return TowerOutputMapper.toOutput(entity, foundations);
      } catch (e) {
        this.handleError(e);
      }
    }

    private handleError(e: Error) {
      if (e instanceof EntityValidationError) {
        throw new EntityValidationError(e.error);
      }
      throw e;
    }
  }
}
