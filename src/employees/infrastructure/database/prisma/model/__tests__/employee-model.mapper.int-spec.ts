import { Employee, PrismaClient } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EmployeeModelMapper } from '../employee-model.mapper';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';

describe('EmployeeModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.employee.deleteMany();
    props = {
      id: '7839cf9b-cef5-4c33-b68a-f4cefde5fe94',
      registration: '1',
      fullName: 'Hugo',
      occupation: 'Encarregado',
      leadership: true,
      status: 'ACTIVE',
      teamId: null,
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when employee model is invalid', async () => {
    const model: Employee = Object.assign(props, { fullName: null });
    expect(() => EmployeeModelMapper.toEntity(model)).toThrowError(
      ValidationError,
    );
  });

  it('should convert a employee model to a employee entity', async () => {
    const model: Employee = await prismaService.employee.create({
      data: props,
    });
    const sut = EmployeeModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(EmployeeEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
