import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetEmployeeUseCase } from '../get-employee.usecase';
import { EmployeeInMemoryRepository } from '@/employees/infrastructure/database/in-memory/employee-in-memory.repository';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';

describe('GetEmployeeUseCase Unit Tests', () => {
  let sut: GetEmployeeUseCase.UseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    sut = new GetEmployeeUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a employee', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new EmployeeEntity(employeeDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      registration: items[0].registration,
      fullName: items[0].fullName,
      occupation: items[0].occupation,
      leadership: items[0].leadership,
      status: items[0].status,
      createdAt: items[0].createdAt,
    });
  });
});
