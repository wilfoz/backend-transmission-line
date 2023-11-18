import { TaskInMemoryRepository } from '@/task/infrastructure/database/in-memory/task-in-memory.repository';
import { ListTasksUseCase } from '../list-task.usecase';
import { TaskRepository } from '@/task/domain/repositories/task.repository';
import { TaskEntity } from '@/task/domain/entities/task.entity';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';

describe('ListTasksUseCase Unit Tests', () => {
  let sut: ListTasksUseCase.UseCase;
  let repository: TaskInMemoryRepository;

  beforeEach(() => {
    repository = new TaskInMemoryRepository();
    sut = new ListTasksUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new TaskRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
    const entity = new TaskEntity(taskDataBuilder({}));
    result = new TaskRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });

  it('should return the task sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new TaskEntity(taskDataBuilder({ createdAt })),
      new TaskEntity(
        taskDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new TaskEntity(
        taskDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
      ),
    ];

    repository.items = items;
    const output = await sut.execute({});
    expect(output).toStrictEqual({
      items: [...items].map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    });
  });

  it('should return the tasks pagination, sorted and filter', async () => {
    const items = [
      new TaskEntity(taskDataBuilder({ stage: 'LANCAMENTO' })),
      new TaskEntity(taskDataBuilder({ stage: 'MONTAGEM' })),
      new TaskEntity(taskDataBuilder({ stage: 'CIVIL' })),
      new TaskEntity(taskDataBuilder({ stage: 'MONTAGEM' })),
      new TaskEntity(taskDataBuilder({ stage: 'CIVIL' })),
      new TaskEntity(taskDataBuilder({ stage: 'MONTAGEM' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'MONTAGEM',
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[3].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'MONTAGEM',
    });
    expect(output).toStrictEqual({
      items: [items[5].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });
  });
});
