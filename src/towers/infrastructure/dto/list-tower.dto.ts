import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListTowersUseCase } from '@/towers/application/usecases/list-towers.usecase';
import { IsOptional } from 'class-validator';

export class ListTowerDto implements ListTowersUseCase.Input {
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
