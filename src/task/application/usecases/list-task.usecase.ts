import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import { TaskOutput, TaskOutputMapper } from '../dto/task-output';
import { TaskRepository } from '@/task/domain/repositories/task.repository';

export namespace ListTasksUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<TaskOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TaskRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const params = new TaskRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: TaskRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return TaskOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
