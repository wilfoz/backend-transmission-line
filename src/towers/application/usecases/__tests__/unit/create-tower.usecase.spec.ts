import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { CreateTowerUseCase } from '../../create-tower.usecase';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { FoundationInMemoryRepository } from '../../../../../foundations/infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../../../foundations/domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../../../foundations/domain/helpers/foundation-data-builder';

describe('CreateTowerUseCase Unit Tests', () => {
  let sut: CreateTowerUseCase.UseCase;
  let tower_repository: TowerInMemoryRepository;
  let foundation_repository: FoundationInMemoryRepository;

  beforeEach(() => {
    tower_repository = new TowerInMemoryRepository();
    foundation_repository = new FoundationInMemoryRepository();
    sut = new CreateTowerUseCase.UseCase(
      tower_repository,
      foundation_repository,
    );
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
      jest.spyOn(tower_repository, 'insert').mockRejectedValue(expectedError);
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
          foundations: ['8e22b443-eb39-4368-af81-36b217591435'],
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
          foundations: ['8e22b443-eb39-4368-af81-36b217591435'],
          embargo: 'RELEASE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a tower', async () => {
      const spyInsert = jest.spyOn(tower_repository, 'insert');
      const foundation = new FoundationEntity(foundationDataBuilder({}));
      await foundation_repository.insert(foundation);

      const output = await sut.execute({
        code: 1,
        tower: '1/1',
        type: 'AT',
        coordinates: { latitude: '1111', longitude: '1111' },
        distance: 10,
        height: 12,
        weight: 20,
        foundations: [foundation.id],
        embargo: 'RELEASE',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: tower_repository.items[0].id,
        code: 1,
        tower: '1/1',
        type: 'AT',
        coordinates: { latitude: '1111', longitude: '1111' },
        distance: 10,
        height: 12,
        weight: 20,
        foundations: [
          {
            id: foundation.id,
            project: foundation.project,
            revision: foundation.revision,
            description: foundation.description,
            excavation_volume: foundation.excavation_volume,
            concrete_volume: foundation.concrete_volume,
            backfill_volume: foundation.backfill_volume,
            steel_volume: foundation.steel_volume,
            createdAt: foundation.createdAt,
          },
        ],
        embargo: 'RELEASE',
        createdAt: tower_repository.items[0].createdAt,
      });
    });
  });
});
