import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { TaskOutput, TaskOutputMapper } from '../dto/task-output';
import { TaskRepository } from '@/task/domain/repositories/task.repository';
import { Stage } from '@/task/domain/entities/task.entity';

export namespace UpdateTaskUseCase {
  export type Input = {
    id: string;
    code: number;
    stage: Stage;
    group: string;
    name: string;
    unit: string;
  };

  export type Output = TaskOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TaskRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      entity.update(input);
      this.repository.update(entity);
      return TaskOutputMapper.toOutput(entity);
    }
  }
}
