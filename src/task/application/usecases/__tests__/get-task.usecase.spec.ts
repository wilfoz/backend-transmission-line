import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetTaskUseCase } from '../get-taks.usecase';
import { TaskInMemoryRepository } from '@/task/infrastructure/database/in-memory/task-in-memory.repository';
import { TaskEntity } from '@/task/domain/entities/task.entity';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';

describe('GetTaskUseCase Unit Tests', () => {
  let sut: GetTaskUseCase.UseCase;
  let repository: TaskInMemoryRepository;

  beforeEach(() => {
    repository = new TaskInMemoryRepository();
    sut = new GetTaskUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a task', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new TaskEntity(taskDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      code: items[0].code,
      stage: items[0].stage,
      group: items[0].group,
      name: items[0].name,
      unit: items[0].unit,
      createdAt: items[0].createdAt,
    });
  });
});
