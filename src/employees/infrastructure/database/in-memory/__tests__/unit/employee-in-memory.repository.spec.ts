import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { EmployeeInMemoryRepository } from '../../employee-in-memory.repository';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';

describe('EmployeeInMemoryRepository Unit Tests', () => {
  let sut: EmployeeInMemoryRepository;

  beforeEach(() => {
    sut = new EmployeeInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new EmployeeEntity(employeeDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter fullName field using filter params', async () => {
    const items = [
      new EmployeeEntity(employeeDataBuilder({ fullName: 'A' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'C' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'B' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'C');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new EmployeeEntity(employeeDataBuilder({ createdAt })),
      new EmployeeEntity(
        employeeDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new EmployeeEntity(
        employeeDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by registration', async () => {
    const items = [
      new EmployeeEntity(employeeDataBuilder({ registration: '1' })),
      new EmployeeEntity(employeeDataBuilder({ registration: '3' })),
      new EmployeeEntity(employeeDataBuilder({ registration: '2' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'registration', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by occupation', async () => {
    const items = [
      new EmployeeEntity(employeeDataBuilder({ occupation: 'A' })),
      new EmployeeEntity(employeeDataBuilder({ occupation: 'C' })),
      new EmployeeEntity(employeeDataBuilder({ occupation: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'occupation', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by fullName', async () => {
    const items = [
      new EmployeeEntity(employeeDataBuilder({ fullName: 'A' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'C' })),
      new EmployeeEntity(employeeDataBuilder({ fullName: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'fullName', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });
});
