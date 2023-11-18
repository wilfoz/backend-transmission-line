import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  Stage,
  TaskEntity,
  TaskProps,
} from '@/task/domain/entities/task.entity';
import { TaskPrismaRepository } from '../tower-prisma.repository';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';
import { TaskRepository } from '@/task/domain/repositories/task.repository';

describe('TaskPrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: TaskProps;
  let sut: TaskPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new TaskPrismaRepository(prismaService as any);
    props = taskDataBuilder({});
    await prismaService.task.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('TaskModel not found ID fakeId'),
    );
  });

  it('should finds a task by id', async () => {
    const entity = new TaskEntity(props);
    const task = await prismaService.task.create({
      data: entity.toJSON(),
    });
    const output = await sut.findById(task.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new task', async () => {
    const entity = new TaskEntity(props);
    await sut.insert(entity);
    const result = await prismaService.task.findUnique({
      where: {
        id: entity._id,
      },
    });
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should returns all task', async () => {
    const entity = new TaskEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a task not found', async () => {
    const entity = new TaskEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`TaskModel not found ID ${entity._id}`),
    );
  });

  it('should update a task', async () => {
    const entity = new TaskEntity(props);
    const task = await prismaService.task.create({
      data: entity.toJSON(),
    });
    entity.update({
      ...props,
      group: 'Escavação',
      unit: 'km',
    });
    await sut.update(entity);
    const output = await sut.findById(task.id);
    expect(output.group).toBe('Escavação');
    expect(output.unit).toBe('km');
  });

  it('should throws error on delete when a task not found', async () => {
    const entity = new TaskEntity(taskDataBuilder({}));
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`TaskModel not found ID ${entity._id}`),
    );
  });

  it('should delete a task', async () => {
    const entity = new TaskEntity(taskDataBuilder({}));
    const task = await prismaService.task.create({
      data: entity.toJSON(),
    });
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createdAt = new Date();
      const entities: TaskEntity[] = [];
      const arrange = Array(16).fill(props);
      arrange.forEach((element, index) => {
        entities.push(
          new TaskEntity({
            ...element,
            name: `${index}-Locação`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.task.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const output = await sut.search(new TaskRepository.SearchParams());
      const items = output.items;
      expect(output).toBeInstanceOf(TaskRepository.SearchResult);
      expect(output.total).toBe(16);
      expect(output.items.length).toBe(15);
      output.items.forEach(item => {
        expect(item).toBeInstanceOf(TaskEntity);
      });
      items.reverse().forEach((item, index) => {
        expect(`${index + 1}-Locação`).toBe(item.name);
      });
    });

    it('should search using filter sort and paginate', async () => {
      const createdAt = new Date();
      const entities: TaskEntity[] = [];
      const arrange = ['CIVIL', 'MONTAGEM', 'LANCAMENTO', 'CIVIL', 'MONTAGEM'];
      arrange.forEach((element, index) => {
        entities.push(
          new TaskEntity({
            ...taskDataBuilder({ stage: element as Stage }),
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.task.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const searchOutputPage1 = await sut.search(
        new TaskRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'stage',
          sortDir: 'asc',
          filter: 'CIVIL',
        }),
      );

      expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
        entities[0].toJSON(),
      );

      expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
        entities[3].toJSON(),
      );
    });
  });
});
