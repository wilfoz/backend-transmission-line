import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListTasksUseCase } from '@/task/application/usecases/list-task.usecase';
import { IsOptional } from 'class-validator';

export class ListTaskDto implements ListTasksUseCase.Input {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  sort?: string;

  @IsOptional()
  sortDir?: SortDirection;

  @IsOptional()
  filter?: string;
}
