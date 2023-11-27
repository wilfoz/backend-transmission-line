import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';

export class TeamInMemoryRepository
  extends InMemorySearchableRepository<TeamEntity>
  implements TeamRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt'];

  protected async applyFilter(
    items: TeamEntity[],
    filter: TeamRepository.Filter,
  ): Promise<TeamEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: TeamEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<TeamEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
