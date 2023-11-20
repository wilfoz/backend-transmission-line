import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import {
  EmployeeEntity,
  EmployeeProps,
} from '@/employees/domain/entities/employee.entity';
import { EmployeePrismaRepository } from '../employee-prisma.repository';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';

describe('EmployeePrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: EmployeeProps;
  let sut: EmployeePrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new EmployeePrismaRepository(prismaService as any);
    props = employeeDataBuilder({});
    await prismaService.employee.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('EmployeeModel not found ID fakeId'),
    );
  });

  it('should finds a employee by id', async () => {
    const entity = new EmployeeEntity(props);
    const employee = await prismaService.employee.create({
      data: entity.toJSON(),
    });
    const output = await sut.findById(employee.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new employee', async () => {
    const entity = new EmployeeEntity(props);
    await sut.insert(entity);
    const result = await prismaService.employee.findUnique({
      where: {
        id: entity._id,
      },
    });
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should returns all employee', async () => {
    const entity = new EmployeeEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a employee not found', async () => {
    const entity = new EmployeeEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`EmployeeModel not found ID ${entity._id}`),
    );
  });

  it('should update a employee', async () => {
    const entity = new EmployeeEntity(props);
    const employee = await prismaService.employee.create({
      data: entity.toJSON(),
    });
    entity.update({
      ...props,
      fullName: 'Lucas Luke Skywalker',
      occupation: 'Jedi',
    });
    await sut.update(entity);
    const output = await sut.findById(employee.id);
    expect(output.fullName).toBe('Lucas Luke Skywalker');
    expect(output.occupation).toBe('Jedi');
  });

  it('should throws error on delete when a employee not found', async () => {
    const entity = new EmployeeEntity(employeeDataBuilder({}));
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`EmployeeModel not found ID ${entity._id}`),
    );
  });

  it('should delete a employee', async () => {
    const entity = new EmployeeEntity(employeeDataBuilder({}));
    const tower = await prismaService.employee.create({
      data: entity.toJSON(),
    });
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createdAt = new Date();
      const entities: EmployeeEntity[] = [];
      const arrange = Array(16).fill(props);
      arrange.forEach((element, index) => {
        entities.push(
          new EmployeeEntity({
            ...element,
            fullName: `${index}Name`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.employee.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const output = await sut.search(new EmployeeRepository.SearchParams());
      const items = output.items;
      expect(output).toBeInstanceOf(EmployeeRepository.SearchResult);
      expect(output.total).toBe(16);
      expect(output.items.length).toBe(15);
      output.items.forEach(item => {
        expect(item).toBeInstanceOf(EmployeeEntity);
      });
      items.reverse().forEach((item, index) => {
        expect(`${index + 1}Name`).toBe(item.fullName);
      });
    });

    it('should search using filter sort and paginate', async () => {
      const createdAt = new Date();
      const entities: EmployeeEntity[] = [];
      const arrange = [
        'test da silva',
        'a',
        'TEST da silva',
        'b',
        'TeSt da silva',
      ];
      arrange.forEach((element, index) => {
        entities.push(
          new EmployeeEntity({
            ...employeeDataBuilder({ fullName: element }),
            registration: `RG-${index + 100}`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      console.log(entities);

      await prismaService.employee.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const searchOutputPage1 = await sut.search(
        new EmployeeRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'fullName',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      );

      expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
        entities[0].toJSON(),
      );

      expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
        entities[4].toJSON(),
      );

      const searchOutputPage2 = await sut.search(
        new EmployeeRepository.SearchParams({
          page: 2,
          perPage: 2,
          sort: 'fullName',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      );

      expect(searchOutputPage2.items[0].toJSON()).toMatchObject(
        entities[2].toJSON(),
      );
    });
  });
});
