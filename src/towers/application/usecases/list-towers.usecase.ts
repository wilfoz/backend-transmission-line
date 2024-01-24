import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import { TowerOutput, TowerOutputMapper } from '../dto/tower-output';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { FoundationRepository } from '../../../foundations/domain/repositories/foundation.repository';

export namespace ListTowersUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<TowerOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private repository: TowerRepository.Repository,
      private foundationRepo: FoundationRepository.Repository,
    ) { }

    async execute(input: Input): Promise<Output> {
      const params = new TowerRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private async toOutput(
      searchResult: TowerRepository.SearchResult,
    ): Promise<Output> {
      const foundationsIds = searchResult.items.reduce<string[]>(
        (acc, item) => {
          return acc.concat([...item.foundations]);
        },
        [],
      );

      const foundations = await Promise.all(
        foundationsIds.map(id => this.foundationRepo.findById(id)),
      );

      const items = searchResult.items.map(item => {
        const foundationsOfTower = foundations.filter(c =>
          item.foundations.includes(c.id),
        );

        return TowerOutputMapper.toOutput(item, foundationsOfTower);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
