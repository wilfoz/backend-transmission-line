import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TaskOutput, TaskOutputMapper } from '../dto/task-output';
import { TaskRepository } from '@/task/domain/repositories/task.repository';

export namespace GetTaskUseCase {
  export type Input = {
    id: string;
  };

  export type Output = TaskOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TaskRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return TaskOutputMapper.toOutput(entity);
    }
  }
}
