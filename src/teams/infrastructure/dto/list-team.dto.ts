import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListTeamsUseCase } from '@/teams/application/usecases/list-team.usecase';
import { IsOptional } from 'class-validator';

export class ListTeamDto implements ListTeamsUseCase.Input {
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
