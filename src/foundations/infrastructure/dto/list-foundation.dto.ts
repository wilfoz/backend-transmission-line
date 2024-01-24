import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';
import { ListFoundationsUseCase } from '../../application/usecases/list-foundation.usecase';

export class ListFoundationDto implements ListFoundationsUseCase.Input {
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
