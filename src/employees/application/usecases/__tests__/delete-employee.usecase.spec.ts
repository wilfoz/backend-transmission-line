import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteEmployeeUseCase } from '../delete-employee.usecase';
import { EmployeeInMemoryRepository } from '@/employees/infrastructure/database/in-memory/employee-in-memory.repository';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';

describe('DeleteEmployeeUseCase Unit Tests', () => {
  let sut: DeleteEmployeeUseCase.UseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    sut = new DeleteEmployeeUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a Employee', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new EmployeeEntity(employeeDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
