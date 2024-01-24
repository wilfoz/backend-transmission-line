import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  FoundationOutput,
  FoundationOutputMapper,
} from '../dto/foundation-output';
import { FoundationRepository } from '../../domain/repositories/foundation.repository';
import { FoundationEntity } from '../../domain/entities/foundation.entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';

export namespace CreateFoundationUseCase {
  export type Input = {
    project: string;
    revision: string;
    description: string;
    excavation_volume: number;
    concrete_volume: number;
    backfill_volume: number;
    steel_volume: number;
  };

  export type Output = FoundationOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: FoundationRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      try {
        const entity = new FoundationEntity(input);
        await this.repository.insert(entity);
        return FoundationOutputMapper.toOutput(entity);
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
