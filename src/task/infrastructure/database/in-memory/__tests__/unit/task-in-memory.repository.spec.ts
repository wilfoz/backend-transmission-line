import { TaskInMemoryRepository } from '../../task-in-memory.repository';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';
import { TaskEntity } from '@/task/domain/entities/task.entity';

describe('TaskInMemoryRepository Unit Tests', () => {
  let sut: TaskInMemoryRepository;

  beforeEach(() => {
    sut = new TaskInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new TaskEntity(taskDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter group field using filter params', async () => {
    const items = [
      new TaskEntity(taskDataBuilder({ stage: 'CIVIL' })),
      new TaskEntity(taskDataBuilder({ stage: 'MONTAGEM' })),
      new TaskEntity(taskDataBuilder({ stage: 'LANCAMENTO' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'LANCAMENTO');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[2]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new TaskEntity(taskDataBuilder({ createdAt })),
      new TaskEntity(
        taskDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new TaskEntity(
        taskDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by code', async () => {
    const items = [
      new TaskEntity(taskDataBuilder({ code: 1 })),
      new TaskEntity(taskDataBuilder({ code: 3 })),
      new TaskEntity(taskDataBuilder({ code: 2 })),
    ];
    const itemsSorted = await sut['applySort'](items, 'code', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by group', async () => {
    const items = [
      new TaskEntity(taskDataBuilder({ group: 'A' })),
      new TaskEntity(taskDataBuilder({ group: 'C' })),
      new TaskEntity(taskDataBuilder({ group: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'group', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by name', async () => {
    const items = [
      new TaskEntity(taskDataBuilder({ name: 'A' })),
      new TaskEntity(taskDataBuilder({ name: 'C' })),
      new TaskEntity(taskDataBuilder({ name: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'name', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });
});
