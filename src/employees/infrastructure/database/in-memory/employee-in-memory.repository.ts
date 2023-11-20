import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';

export class EmployeeInMemoryRepository
  extends InMemorySearchableRepository<EmployeeEntity>
  implements EmployeeRepository.Repository {
  sortableFields: string[] = [
    'registration',
    'fullName',
    'occupation',
    'createdAt',
  ];

  protected async applyFilter(
    items: EmployeeEntity[],
    filter: EmployeeRepository.Filter,
  ): Promise<EmployeeEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.fullName.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: EmployeeEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<EmployeeEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
