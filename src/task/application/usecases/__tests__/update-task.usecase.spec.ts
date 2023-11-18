import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UpdateTaskUseCase } from '../update-task.usecase';
import { TaskEntity } from '@/task/domain/entities/task.entity';
import { TaskInMemoryRepository } from '@/task/infrastructure/database/in-memory/task-in-memory.repository';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';
import { TaskOutputMapper } from '../../dto/task-output';

describe('UpdateTaskUseCase Unit Tests', () => {
  let sut: UpdateTaskUseCase.UseCase;
  let repository: TaskInMemoryRepository;
  let entity: TaskEntity;

  beforeEach(() => {
    repository = new TaskInMemoryRepository();
    sut = new UpdateTaskUseCase.UseCase(repository);
    entity = new TaskEntity(taskDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const entityMapped = TaskOutputMapper.toOutput(entity);
    await expect(() => sut.execute(entityMapped)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update task', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new TaskEntity(taskDataBuilder({}))];
    repository.items = items;
    const entityMapped = TaskOutputMapper.toOutput(items[0]);
    const result = await sut.execute({
      ...entityMapped,
      code: 1,
      stage: 'CIVIL',
      group: 'Topografia',
      name: 'Locação de cavas',
      unit: 'torre',
    });
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      code: 1,
      stage: items[0].stage,
      group: items[0].group,
      name: items[0].name,
      unit: items[0].unit,
      createdAt: items[0].createdAt,
    });
  });
});
