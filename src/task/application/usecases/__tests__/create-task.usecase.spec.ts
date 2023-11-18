import { TaskInMemoryRepository } from '@/task/infrastructure/database/in-memory/task-in-memory.repository';
import { CreateTaskUseCase } from '../create-task.usecase';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { TaskEntity } from '@/task/domain/entities/task.entity';

describe('CreateTaskUseCase Unit Tests', () => {
  let sut: CreateTaskUseCase.UseCase;
  let repository: TaskInMemoryRepository;

  beforeEach(() => {
    repository = new TaskInMemoryRepository();
    sut = new CreateTaskUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  describe('handleError method', () => {
    it('should throw a generic error', () => {
      const error = new Error('error test');
      expect(() => sut['handleError'](error)).toThrowError(error);
    });

    it('should throw an entity validation error', () => {
      const error = new EntityValidationError({ name: ['error test'] });
      expect(() => sut['handleError'](error)).toThrowError(error);
    });
  });

  describe('execute method', () => {
    it('should throw an generic error', async () => {
      const expectedError = new Error('generic error');
      jest.spyOn(repository, 'insert').mockRejectedValue(expectedError);
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);

      await expect(
        sut.execute({
          code: 1,
          stage: 'CIVIL',
          group: 'Preliminar',
          name: 'Locação de cavas',
          unit: 'torre',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(TaskEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(
        sut.execute({
          code: 1,
          stage: 'CIVIL',
          group: 'Preliminar',
          name: 'Locação de cavas',
          unit: 'torre',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a task', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        code: 1,
        stage: 'CIVIL',
        group: 'Preliminar',
        name: 'Locação de cavas',
        unit: 'torre',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        code: 1,
        stage: 'CIVIL',
        group: 'Preliminar',
        name: 'Locação de cavas',
        unit: 'torre',
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
