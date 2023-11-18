import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteTaskUseCase } from '../delete-task.usecase';
import { TaskInMemoryRepository } from '@/task/infrastructure/database/in-memory/task-in-memory.repository';
import { TaskEntity } from '@/task/domain/entities/task.entity';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';

describe('DeleteTaskUseCase Unit Tests', () => {
  let sut: DeleteTaskUseCase.UseCase;
  let repository: TaskInMemoryRepository;

  beforeEach(() => {
    repository = new TaskInMemoryRepository();
    sut = new DeleteTaskUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a task', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new TaskEntity(taskDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
