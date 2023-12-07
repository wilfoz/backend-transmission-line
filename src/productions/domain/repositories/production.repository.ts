import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { ProductionEntity } from '../entities/production.entity';

export namespace ProductionRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<
    ProductionEntity,
    Filter
  > { }

  export interface Repository
    extends SearchableRepositoryInterface<
      ProductionEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    includeAndUpdateResource(production: ProductionEntity): Promise<void>;
    removeAndUpdateResource(production: ProductionEntity): Promise<void>;
  }
}
