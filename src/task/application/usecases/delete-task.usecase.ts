import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TaskRepository } from '@/task/domain/repositories/task.repository';

export namespace DeleteTaskUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TaskRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
