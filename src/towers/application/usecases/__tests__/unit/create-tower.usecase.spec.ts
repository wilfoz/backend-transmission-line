import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { CreateTowerUseCase } from '../../create-tower.usecase';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';

describe('CreateTowerUseCase Unit Tests', () => {
  let sut: CreateTowerUseCase.UseCase;
  let repository: TowerInMemoryRepository;

  beforeEach(() => {
    repository = new TowerInMemoryRepository();
    sut = new CreateTowerUseCase.UseCase(repository);
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
          tower: '1/1',
          type: 'AT',
          coordinates: { latitude: '1111', longitude: '1111' },
          distance: 10,
          height: 12,
          weight: 20,
          type_of_foundation_A: 'T',
          type_of_foundation_B: 'T',
          type_of_foundation_C: 'T',
          type_of_foundation_D: 'T',
          type_of_foundation_MC: 'T',
          embargo: 'RELEASE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(TowerEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(
        sut.execute({
          code: 1,
          tower: '1/1',
          type: 'AT',
          coordinates: { latitude: '1111', longitude: '1111' },
          distance: 10,
          height: 12,
          weight: 20,
          type_of_foundation_A: 'T',
          type_of_foundation_B: 'T',
          type_of_foundation_C: 'T',
          type_of_foundation_D: 'T',
          type_of_foundation_MC: 'T',
          embargo: 'RELEASE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a tower', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        code: 1,
        tower: '1/1',
        type: 'AT',
        coordinates: { latitude: '1111', longitude: '1111' },
        distance: 10,
        height: 12,
        weight: 20,
        type_of_foundation_A: 'T',
        type_of_foundation_B: 'T',
        type_of_foundation_C: 'T',
        type_of_foundation_D: 'T',
        type_of_foundation_MC: 'T',
        embargo: 'RELEASE',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        code: 1,
        tower: '1/1',
        type: 'AT',
        coordinates: { latitude: '1111', longitude: '1111' },
        distance: 10,
        height: 12,
        weight: 20,
        type_of_foundation_A: 'T',
        type_of_foundation_B: 'T',
        type_of_foundation_C: 'T',
        type_of_foundation_D: 'T',
        type_of_foundation_MC: 'T',
        embargo: 'RELEASE',
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
