import { PrismaClient, Task } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { TaskModelMapper } from '../task-model.mapper';
import { TaskEntity } from '@/task/domain/entities/task.entity';

describe('TaskModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.task.deleteMany();
    props = {
      id: '7839cf9b-cef5-4c33-b68a-f4cefde5fe94',
      code: 1,
      stage: 'CIVIL',
      group: 'Topografia',
      name: 'Locação de torres',
      unit: 'torre',
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when task model is invalid', async () => {
    const model: Task = Object.assign(props, { name: null });
    expect(() => TaskModelMapper.toEntity(model)).toThrowError(ValidationError);
  });

  it('should convert a task model to a task entity', async () => {
    const model: Task = await prismaService.task.create({
      data: props,
    });
    const sut = TaskModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(TaskEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
