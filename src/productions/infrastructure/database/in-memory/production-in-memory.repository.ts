import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ProductionEntity } from '../../../domain/entities/production.entity';
import { ProductionRepository } from '../../../domain/repositories/production.repository';

export class ProductionInMemoryRepository
  extends InMemorySearchableRepository<ProductionEntity>
  implements ProductionRepository.Repository {
  sortableFields: string[] = ['status', 'comments', 'createdAt'];

  protected async applyFilter(
    items: ProductionEntity[],
    filter: ProductionRepository.Filter,
  ): Promise<ProductionEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.status.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: ProductionEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<ProductionEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }

  async removeAndUpdateResource(team: ProductionEntity): Promise<void> {
    this.update(team);
  }

  async includeAndUpdateResource(team: ProductionEntity): Promise<void> {
    this.update(team);
  }
}
