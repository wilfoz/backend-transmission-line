import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CreateEmployeeUseCase } from '../create-employee.usecase';
import { EmployeeInMemoryRepository } from '@/employees/infrastructure/database/in-memory/employee-in-memory.repository';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';

describe('CreateEmployeeUseCase Unit Tests', () => {
  let sut: CreateEmployeeUseCase.UseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    sut = new CreateEmployeeUseCase.UseCase(repository);
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
          fullName: 'Test',
          occupation: 'Ajudante',
          leadership: false,
          status: 'ACTIVE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should throw an entity validation error', async () => {
      const expectedError = new EntityValidationError({
        name: ['is required'],
      });
      jest.spyOn(EmployeeEntity, 'validate').mockImplementation(() => {
        throw expectedError;
      });
      const spyHandleError = jest.spyOn(sut, 'handleError' as any);
      await expect(
        sut.execute({
          registration: '1',
          fullName: 'Test',
          occupation: 'Ajudante',
          leadership: false,
          status: 'ACTIVE',
        }),
      ).rejects.toThrowError(expectedError);
      expect(spyHandleError).toHaveBeenLastCalledWith(expectedError);
    });

    it('should create a Employee', async () => {
      const spyInsert = jest.spyOn(repository, 'insert');
      const output = await sut.execute({
        registration: '1',
        fullName: 'Test',
        occupation: 'Ajudante',
        leadership: false,
        status: 'ACTIVE',
      });
      expect(spyInsert).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
        id: repository.items[0].id,
        registration: '1',
        fullName: 'Test',
        occupation: 'Ajudante',
        leadership: false,
        status: 'ACTIVE',
        createdAt: repository.items[0].createdAt,
      });
    });
  });
});
