import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { FoundationEntity } from '../../../domain/entities/foundation.entity';
import { FoundationRepository } from '../../../domain/repositories/foundation.repository';

export class FoundationInMemoryRepository
  extends InMemorySearchableRepository<FoundationEntity>
  implements FoundationRepository.Repository {
  sortableFields: string[] = [
    'project',
    'revision',
    'description',
    'createdAt',
  ];

  protected async applyFilter(
    items: FoundationEntity[],
    filter: FoundationRepository.Filter,
  ): Promise<FoundationEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.description
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: FoundationEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<FoundationEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
