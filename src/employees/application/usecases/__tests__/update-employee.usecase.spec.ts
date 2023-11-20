import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UpdateEmployeeUseCase } from '../update-employee.usecase';
import { EmployeeInMemoryRepository } from '@/employees/infrastructure/database/in-memory/employee-in-memory.repository';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';
import { EmployeeOutputMapper } from '../../dto/employee-output';

describe('UpdateEmployeeUseCase Unit Tests', () => {
  let sut: UpdateEmployeeUseCase.UseCase;
  let repository: EmployeeInMemoryRepository;
  let entity: EmployeeEntity;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    sut = new UpdateEmployeeUseCase.UseCase(repository);
    entity = new EmployeeEntity(employeeDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const entityMapped = EmployeeOutputMapper.toOutput(entity);
    await expect(() => sut.execute(entityMapped)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update employee', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new EmployeeEntity(employeeDataBuilder({}))];
    repository.items = items;
    const entityMapped = EmployeeOutputMapper.toOutput(items[0]);
    const result = await sut.execute({
      ...entityMapped,
      registration: '1',
      fullName: 'Carlos',
      occupation: 'Topografo',
      leadership: true,
      status: 'ACTIVE',
    });
    expect(spyUpdate).toHaveBeenCalled();
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
