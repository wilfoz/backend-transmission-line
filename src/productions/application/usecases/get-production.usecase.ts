import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  ProductionOutput,
  ProductionOutputMapper,
} from '../dto/production-output';
import { ProductionRepository } from '../../domain/repositories/production.repository';

export namespace GetProductionUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ProductionOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: ProductionRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return ProductionOutputMapper.toOutput(entity);
    }
  }
}
