import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import { TeamOutput, TeamOutputMapper } from '../dto/team-output';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';

export namespace ListTeamsUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<TeamOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TeamRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const params = new TeamRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: TeamRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return TeamOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
