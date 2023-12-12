import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  ProductionEntity,
  ProductionProps,
  STATUS_PRODUCTION,
} from '../../../../domain/entities/production.entity';
import { ProductionPrismaRepository } from '../production-prisma.repository';
import { productionDataBuilder } from '../../../../domain/helpers/production-data-builder';
import { ProductionRepository } from '../../../../domain/repositories/production.repository';

describe('ProductionPrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: ProductionProps;
  let task: any;
  let sut: ProductionPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    await prismaService.production.deleteMany();
    await prismaService.task.deleteMany();

    sut = new ProductionPrismaRepository(prismaService as any);
    props = productionDataBuilder({ teams: [], towers: [] });
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

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('ProductionModel not found ID fakeId'),
    );
  });

  it('should finds a production by id', async () => {
    const entity = new ProductionEntity(props);
    const data = entity.toJSON();

    const production = await prismaService.production.create({
      data: {
        id: data.id,
        status: data.status as STATUS_PRODUCTION,
        comments: data.comments,
        startTime: data.startTime,
        finalTime: data.finalTime,
        taskId: task.id,
        createdAt: data.createdAt,
      },
    });
    const output = await sut.findById(production.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new production', async () => {
    const entity = new ProductionEntity(props);
    await sut.insert(entity);
    const output = await prismaService.production.findUnique({
      where: {
        id: entity._id,
      },
    });
    const result = { ...output, teams: props.teams, towers: props.towers };
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should returns all productions', async () => {
    const entity = new ProductionEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a production not found', async () => {
    const entity = new ProductionEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`ProductionModel not found ID ${entity._id}`),
    );
  });

  it('should update a production', async () => {
    const entity = new ProductionEntity(props);
    await sut.insert(entity);

    entity.update({
      ...props,
      comments: 'new comment',
    });

    await sut.update(entity);
    const output = await sut.findById(entity.id);
    expect(output.comments).toBe('new comment');
  });

  it('should throws error on delete when a production not found', async () => {
    const entity = new ProductionEntity(props);
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`ProductionModel not found ID ${entity._id}`),
    );
  });

  it('should delete a team', async () => {
    const entity = new ProductionEntity(props);
    await sut.insert(entity);
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const entity = new ProductionEntity(props);
      await sut.insert(entity);

      const searchOutput = await sut.search(
        new ProductionRepository.SearchParams(),
      );

      expect(searchOutput).toBeInstanceOf(ProductionRepository.SearchResult);
      expect(searchOutput.total).toBe(1);
      expect(searchOutput.items.length).toBe(1);
      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(ProductionEntity);
      });
    });
  });
});
