import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { STATUS_PRODUCTION } from '../../domain/entities/production.entity';
import {
  ProductionOutput,
  ProductionOutputMapper,
} from '../dto/production-output';
import { ProductionRepository } from '../../domain/repositories/production.repository';

export namespace AddTowerToProductionUseCase {
  export type Input = {
    id: string;
    status: STATUS_PRODUCTION | string;
    comments: string;
    startTime?: Date;
    finalTime?: Date;
    teams: string[];
    towers: string[];
    taskId: string;
  } & Required<{ towerId: string }>;

  export type Output = ProductionOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: ProductionRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      entity.addTower(input.towerId);

      await this.repository.update(entity);
      return ProductionOutputMapper.toOutput(entity);
    }
  }
}
