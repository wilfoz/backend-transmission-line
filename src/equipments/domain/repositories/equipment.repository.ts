import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { EquipmentEntity } from '../entities/equipments.entity';

export namespace EquipmentRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<
    EquipmentEntity,
    Filter
  > { }

  export interface Repository
    extends SearchableRepositoryInterface<
      EquipmentEntity,
      Filter,
      SearchParams,
      SearchResult
    > { }
}
