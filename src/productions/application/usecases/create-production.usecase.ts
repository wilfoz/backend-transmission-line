import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import {
  ProductionEntity,
  STATUS_PRODUCTION,
} from '../../domain/entities/production.entity';
import {
  ProductionOutput,
  ProductionOutputMapper,
} from '../dto/production-output';
import { ProductionRepository } from '../../domain/repositories/production.repository';

export namespace CreateProductionUseCase {
  export type Input = {
    status: STATUS_PRODUCTION;
    comments: string;
    startTime?: Date;
    finalTime?: Date;
    teams?: string[];
    towers?: string[];
    taskId: string;
    createdAt?: Date;
  };

  export type Output = ProductionOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: ProductionRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      try {
        const entity = new ProductionEntity(input);
        await this.repository.insert(entity);
        return ProductionOutputMapper.toOutput(entity);
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
