import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { FoundationEntity } from '../entities/foundation.entity';

export namespace FoundationRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<
    FoundationEntity,
    Filter
  > { }

  export interface Repository
    extends SearchableRepositoryInterface<
      FoundationEntity,
      Filter,
      SearchParams,
      SearchResult
    > { }
}
