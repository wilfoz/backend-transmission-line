import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  ProductionOutput,
  ProductionOutputMapper,
} from '../dto/production-output';
import { ProductionRepository } from '../../domain/repositories/production.repository';
import { STATUS_PRODUCTION } from '../../domain/entities/production.entity';

export namespace UpdateProductionUseCase {
  export type Input = {
    id: string;
    status: STATUS_PRODUCTION;
    comments: string;
    startTime?: Date;
    finalTime?: Date;
    teams?: string[];
    towers?: string[];
    taskId: string;
  };

  export type Output = ProductionOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: ProductionRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      entity.update(input);
      this.repository.update(entity);
      return ProductionOutputMapper.toOutput(entity);
    }
  }
}
