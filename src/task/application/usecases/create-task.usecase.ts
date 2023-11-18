import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { Stage, TaskEntity } from '@/task/domain/entities/task.entity';
import { TaskOutput, TaskOutputMapper } from '../dto/task-output';
import { TaskRepository } from '@/task/domain/repositories/task.repository';

export namespace CreateTaskUseCase {
  export type Input = {
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
      try {
        const entity = new TaskEntity(input);
        await this.repository.insert(entity);
        return TaskOutputMapper.toOutput(entity);
      } catch (e) {
        this.handleError(e);
      }
    }

    private handleError(e: Error) {
      if (e instanceof EntityValidationError) {
        throw new EntityValidationError(e.error);
      }
      throw e;
    }
  }
}
