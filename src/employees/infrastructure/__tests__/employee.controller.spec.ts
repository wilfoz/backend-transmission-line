import { EmployeeOutput } from '@/employees/application/dto/employee-output';
import { EmployeesController } from '../employees.controller';
import { CreateEmployeeUseCase } from '@/employees/application/usecases/create-employee.usecase';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import {
  EmployeePresenter,
  EmployeesCollectionPresenter,
} from '../presenters/employee.presenter';
import { UpdateEmployeeUseCase } from '@/employees/application/usecases/update-employee.usecase';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { GetEmployeeUseCase } from '@/employees/application/usecases/get-employee.usecase';
import { ListEmployeesUseCase } from '@/employees/application/usecases/list-employee.usecase';

describe('EmployeeController Unit Tests', () => {
  let sut: EmployeesController;
  let id: string;
  let props: EmployeeOutput;

  beforeEach(async () => {
    sut = new EmployeesController();
    id: 'e8425c05-8d65-4a17-aad4-7e6087774e5f';
    props = {
      id,
      registration: '1',
      fullName: 'Marcos Alex',
      occupation: 'Ajudante',
      leadership: false,
      status: 'ACTIVE',
      teamId: null,
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a Employee', async () => {
    const output: CreateEmployeeUseCase.Output = props;
    const mockCreateEmployeeUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['createEmployeeUseCase'] = mockCreateEmployeeUseCase as any;
    const input: CreateEmployeeDto = props;
    const presenter = await sut.create(input);
    expect(presenter).toBeInstanceOf(EmployeePresenter);
    expect(presenter).toStrictEqual(new EmployeePresenter(output));
    expect(mockCreateEmployeeUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a Employee', async () => {
    const output: UpdateEmployeeUseCase.Output = props;
    const mockUpdateEmployeeUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateEmployeeUseCase'] = mockUpdateEmployeeUseCase as any;
    const input: UpdateEmployeeDto = {
      registration: 'REG-0012',
      fullName: 'Manoel Macabal',
      occupation: 'Topografo',
      leadership: true,
      status: 'ACTIVE',
    };
    const presenter = await sut.update(id, input);
    expect(presenter).toBeInstanceOf(EmployeePresenter);
    expect(presenter).toStrictEqual(new EmployeePresenter(output));
    expect(mockUpdateEmployeeUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should gets a Employee', async () => {
    const output: GetEmployeeUseCase.Output = props;
    const mockGetEmployeeUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getEmployeeUseCase'] = mockGetEmployeeUseCase as any;
    const presenter = await sut.findOne(id);
    expect(presenter).toBeInstanceOf(EmployeePresenter);
    expect(presenter).toStrictEqual(new EmployeePresenter(output));
    expect(mockGetEmployeeUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should delete a Employee', async () => {
    const output = undefined;
    const mockDeleteEmployeeUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteEmployeeUseCase'] = mockDeleteEmployeeUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteEmployeeUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list a Employees', async () => {
    const output: ListEmployeesUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListEmployeesUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listEmployeesUseCase'] = mockListEmployeesUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const presenter = await sut.search(searchParams);
    expect(presenter).toBeInstanceOf(EmployeesCollectionPresenter);
    expect(presenter).toEqual(new EmployeesCollectionPresenter(output));
    expect(mockListEmployeesUseCase.execute).toHaveBeenCalledWith(searchParams);
  });
});
