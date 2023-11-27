import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CreateEquipmentUseCase } from '../create-equipment.usecase';
import { EquipmentInMemoryRepository } from '@/equipments/infrastructure/database/in-memory/equipment-in-memory.repository';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';

describe('CreateEquipmentUseCase Unit Tests', () => {
  let sut: CreateEquipmentUseCase.UseCase;
  let repository: EquipmentInMemoryRepository;

  beforeEach(() => {
    repository = new EquipmentInMemoryRepository();
    sut = new CreateEquipmentUseCase.UseCase(repository);
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
          registration: '1',
          model: 'Fiat 47',
          manufacturer: 'Ajudante',
          licensePlate: 'AAA:2133',
          provider: 'Fiat',
          status: 'ACTIVE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(EquipmentEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(
        sut.execute({
          registration: '1',
          model: 'Fiat 47',
          manufacturer: 'Ajudante',
          licensePlate: 'AAA:2133',
          provider: 'Fiat',
          status: 'ACTIVE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a Equipment', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        registration: '1',
        model: 'Fiat 47',
        manufacturer: 'Ajudante',
        licensePlate: 'AAA:2133',
        provider: 'Fiat',
        status: 'ACTIVE',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        registration: '1',
        model: 'Fiat 47',
        manufacturer: 'Ajudante',
        licensePlate: 'AAA:2133',
        provider: 'Fiat',
        status: 'ACTIVE',
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
