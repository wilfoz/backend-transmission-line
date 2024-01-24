import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import {
  FoundationOutput,
  FoundationOutputMapper,
} from '../dto/foundation-output';
import { FoundationRepository } from '../../domain/repositories/foundation.repository';

export namespace GetFoundationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = FoundationOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: FoundationRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return FoundationOutputMapper.toOutput(entity);
    }
  }
}
