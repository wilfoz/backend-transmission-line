import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { TowerEntity } from '../entities/towers.entity';

export namespace TowerRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<TowerEntity, Filter> { }

  export interface Repository
    extends SearchableRepositoryInterface<
      TowerEntity,
      Filter,
      SearchParams,
      SearchResult
    > { }
}
