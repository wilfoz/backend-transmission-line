import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  CoordinateProps,
  CoordinatesVO,
} from '@/towers/domain/entities/coordinates-vo';
import { TowerEntity, Embargo } from '@/towers/domain/entities/towers.entity';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export namespace CreateTowerUseCase {
  export type Input = {
    code: number;
    tower: string;
    type: string;
    coordinates: CoordinateProps;
    distance?: number;
    height?: number;
    weight?: number;
    type_of_foundation_A?: string;
    type_of_foundation_B?: string;
    type_of_foundation_C?: string;
    type_of_foundation_D?: string;
    type_of_foundation_MC?: string;
    embargo?: Embargo;
  };

  export type Output = TowerOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TowerRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const coordinates = CoordinatesVO.create(input.coordinates);
      try {
        const entity = new TowerEntity({
          ...input,
          coordinates,
        });
        await this.repository.insert(entity);
        return TowerOutputMapper.toOutput(entity);
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
