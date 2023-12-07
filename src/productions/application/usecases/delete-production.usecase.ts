import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { ProductionRepository } from '../../domain/repositories/production.repository';

export namespace DeleteProductionUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: ProductionRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
