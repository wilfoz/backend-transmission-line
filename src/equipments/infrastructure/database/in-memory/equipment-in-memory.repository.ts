import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';

export class EquipmentInMemoryRepository
  extends InMemorySearchableRepository<EquipmentEntity>
  implements EquipmentRepository.Repository {
  sortableFields: string[] = [
    'registration',
    'model',
    'manufacturer',
    'provider',
    'createdAt',
  ];

  protected async applyFilter(
    items: EquipmentEntity[],
    filter: EquipmentRepository.Filter,
  ): Promise<EquipmentEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.model.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: EquipmentEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<EquipmentEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
