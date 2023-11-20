import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { EmployeeEntity } from '../entities/employee.entity';

export namespace EmployeeRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<
    EmployeeEntity,
    Filter
  > { }

  export interface Repository
    extends SearchableRepositoryInterface<
      EmployeeEntity,
      Filter,
      SearchParams,
      SearchResult
    > { }
}
