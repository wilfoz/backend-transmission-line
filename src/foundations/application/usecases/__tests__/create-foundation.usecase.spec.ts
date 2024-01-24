import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CreateFoundationUseCase } from '../create-foundation.usecase';
import { FoundationInMemoryRepository } from '../../../infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../domain/entities/foundation.entity';

describe('CreateFoundationUseCase Unit Tests', () => {
  let sut: CreateFoundationUseCase.UseCase;
  let repository: FoundationInMemoryRepository;

  beforeEach(() => {
    repository = new FoundationInMemoryRepository();
    sut = new CreateFoundationUseCase.UseCase(repository);
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
          project: 'AT-FUN-MCA-0001',
          revision: '0A',
          description: 'AT-TCB-AFL-0.5',
          excavation_volume: 20,
          concrete_volume: 15,
          backfill_volume: 18,
          steel_volume: 1000,
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(FoundationEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(
        sut.execute({
          project: 'AT-FUN-MCA-0001',
          revision: '0A',
          description: 'AT-TCB-AFL-0.5',
          excavation_volume: 20,
          concrete_volume: 15,
          backfill_volume: 18,
          steel_volume: 1000,
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a Foundation', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        project: 'AT-FUN-MCA-0001',
        revision: '0A',
        description: 'AT-TCB-AFL-0.5',
        excavation_volume: 20,
        concrete_volume: 15,
        backfill_volume: 18,
        steel_volume: 1000,
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        project: 'AT-FUN-MCA-0001',
        revision: '0A',
        description: 'AT-TCB-AFL-0.5',
        excavation_volume: 20,
        concrete_volume: 15,
        backfill_volume: 18,
        steel_volume: 1000,
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
