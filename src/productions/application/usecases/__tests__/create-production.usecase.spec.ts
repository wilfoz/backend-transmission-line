import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CreateProductionUseCase } from '../create-production.usecase';
import { ProductionInMemoryRepository } from '../../../infrastructure/database/in-memory/production-in-memory.repository';
import {
  ProductionEntity,
  ProductionProps,
} from '../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';

describe('CreateProductionUseCase Unit Tests', () => {
  let sut: CreateProductionUseCase.UseCase;
  let repository: ProductionInMemoryRepository;
  let props: ProductionProps;

  beforeEach(() => {
    repository = new ProductionInMemoryRepository();
    sut = new CreateProductionUseCase.UseCase(repository);
    jest.restoreAllMocks();
    props = productionDataBuilder({});
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

      await expect(sut.execute(props)).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(ProductionEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(sut.execute(props)).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a production', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        status: 'EXECUTED',
        comments: 'commentaries',
        teams: ['6fea73d8-6fb7-4186-8398-b630d9a89191'],
        towers: ['36fd938a-b888-4782-9b58-7f6c09f69664'],
        taskId: '3ba89136-293d-4522-810b-1166530db2c6',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        status: repository.items[0].status,
        comments: repository.items[0].comments,
        startTime: repository.items[0].startTime,
        finalTime: repository.items[0].finalTime,
        teams: repository.items[0].teams,
        towers: repository.items[0].towers,
        taskId: repository.items[0].taskId,
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
