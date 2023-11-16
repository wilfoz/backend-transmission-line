import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';

export class TowerInMemoryRepository
  extends InMemorySearchableRepository<TowerEntity>
  // eslint-disable-next-line prettier/prettier
  implements TowerRepository.Repository {
  sortableFields: string[] = ['code', 'tower', 'type', 'createdAt'];

  protected async applyFilter(
    items: TowerEntity[],
    filter: TowerRepository.Filter,
  ): Promise<TowerEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.type.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: TowerEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<TowerEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
