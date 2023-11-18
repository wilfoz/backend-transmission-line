import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { TaskEntity } from '../entities/task.entity';

export namespace TaskRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<TaskEntity, Filter> { }

  export interface Repository
    extends SearchableRepositoryInterface<
      TaskEntity,
      Filter,
      SearchParams,
      SearchResult
    > { }
}
