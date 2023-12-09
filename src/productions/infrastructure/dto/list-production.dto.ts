import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';
import { ListProductionsUseCase } from '../../application/usecases/list-production.usecase';

export class ListProductionDto implements ListProductionsUseCase.Input {
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
