import { ListEmployeesUseCase } from '@/employees/application/usecases/list-employee.usecase';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';

export class ListEmployeeDto implements ListEmployeesUseCase.Input {
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
