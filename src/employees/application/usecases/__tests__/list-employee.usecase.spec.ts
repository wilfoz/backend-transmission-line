import { EmployeeInMemoryRepository } from '@/employees/infrastructure/database/in-memory/employee-in-memory.repository';
import { ListEmployeesUseCase } from '../list-employee.usecase';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';

describe('ListEmployeesUseCase Unit Tests', () => {
  let sut: ListEmployeesUseCase.UseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    sut = new ListEmployeesUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new EmployeeRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
    const entity = new EmployeeEntity(employeeDataBuilder({}));
    result = new EmployeeRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });

  it('should return the employee sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new EmployeeEntity(employeeDataBuilder({ createdAt })),
      new EmployeeEntity(
        employeeDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new EmployeeEntity(
        employeeDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
      ),
    ];

    repository.items = items;
    const output = await sut.execute({});
    expect(output).toStrictEqual({
      items: [...items].map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    });
  });

  it('should return the employees pagination, sorted and filter', async () => {
    const items = [
      new EmployeeEntity(employeeDataBuilder({ fullName: 'test' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'TEST' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'fake' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'Test' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'FAKE' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'FaKe' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'fullName',
      sortDir: 'asc',
      filter: 'test',
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[3].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'fullName',
      sortDir: 'asc',
      filter: 'test',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });
  });
});
