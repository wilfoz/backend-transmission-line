import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';

export namespace ListTowersUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<TowerOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: TowerRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const params = new TowerRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: TowerRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return TowerOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
