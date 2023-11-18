import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { TaskEntity } from '@/task/domain/entities/task.entity';
import { TaskRepository } from '@/task/domain/repositories/task.repository';

export class TaskInMemoryRepository
  extends InMemorySearchableRepository<TaskEntity>
  implements TaskRepository.Repository {
  sortableFields: string[] = ['code', 'stage', 'group', 'name', 'createdAt'];

  protected async applyFilter(
    items: TaskEntity[],
    filter: TaskRepository.Filter,
  ): Promise<TaskEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.stage.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: TaskEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<TaskEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}
