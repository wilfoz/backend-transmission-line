import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { PrismaClient, Production, Team, Tower } from '@prisma/client';
import { ProductionEntity } from '../../../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../../../domain/helpers/production-data-builder';
import { ProductionModelMapper } from '../production-model.mapper';

describe('ProductionModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;
  let task: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  beforeEach(async () => {
    await prismaService.production.deleteMany();
    await prismaService.task.deleteMany();

    props = new ProductionEntity(
      productionDataBuilder({ teams: [], towers: [] }),
    ).toJSON();
    task = await prismaService.task.create({
      data: {
        id: props.taskId,
        code: 1,
        name: 'Locação de torre',
        group: 'CIVIL',
        stage: 'Montagem',
        unit: 'torre',
      },
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when team model is invalid', async () => {
    const model: Required<
      {
        teams: Team[];
        towers: Tower[];
      } & Production
    > = Object.assign(props, { status: null });
    expect(() => ProductionModelMapper.toEntity(model)).toThrowError(
      ValidationError,
    );
  });

  it('should convert a production model to a production entity', async () => {
    const taskId = task.id;
    const model: Required<
      {
        teams: Team[];
        towers: Tower[];
      } & Production
    > = await prismaService.production.create({
      data: {
        id: props.id,
        status: props.status,
        comments: props.comments,
        startTime: props.startTime,
        finalTime: props.finalTime,
        taskId,
        createdAt: props.createdAt,
      },
      include: {
        teams: true,
        towers: true,
      },
    });

    const sut = ProductionModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(ProductionEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
