import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  FoundationOutput,
  FoundationOutputMapper,
} from '../dto/foundation-output';
import { FoundationRepository } from '../../domain/repositories/foundation.repository';

export namespace UpdateFoundationUseCase {
  export type Input = {
    id: string;
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
      const entity = await this.repository.findById(input.id);
      entity.update(input);
      this.repository.update(entity);
      return FoundationOutputMapper.toOutput(entity);
    }
  }
}
