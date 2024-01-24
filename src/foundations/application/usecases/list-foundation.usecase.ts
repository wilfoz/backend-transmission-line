import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import {
  FoundationOutput,
  FoundationOutputMapper,
} from '../dto/foundation-output';
import { FoundationRepository } from '../../domain/repositories/foundation.repository';

export namespace ListFoundationsUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<FoundationOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: FoundationRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const params = new FoundationRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: FoundationRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return FoundationOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
