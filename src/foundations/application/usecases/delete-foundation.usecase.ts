import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { FoundationRepository } from '../../domain/repositories/foundation.repository';

export namespace DeleteFoundationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: FoundationRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
