import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { TeamEntity } from '../entities/team.entity';

export namespace TeamRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<TeamEntity, Filter> { }

  export interface Repository
    extends SearchableRepositoryInterface<
      TeamEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    includeAndUpdateResource(team: TeamEntity): Promise<void>;
    removeAndUpdateResource(team: TeamEntity): Promise<void>;
  }
}
