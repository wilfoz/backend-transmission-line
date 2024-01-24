import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TowerPrismaRepository } from '../tower-prisma.repository';
import {
  TowerEntity,
  TowerProps,
} from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';

describe('TowerPrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: TowerProps;
  let sut: TowerPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new TowerPrismaRepository(prismaService as any);
    props = towerDataBuilder({ foundations: [] });
    await prismaService.tower.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('TowerModel not found ID fakeId'),
    );
  });

  it('should finds a tower by id', async () => {
    const entity = new TowerEntity(props);
    const tower = await prismaService.tower.create({
      data: {
        id: entity.toJSON().id,
        code: entity.toJSON().code,
        tower: entity.toJSON().tower,
        type: entity.toJSON().type,
        distance: entity.toJSON().distance,
        height: entity.toJSON().height,
        weight: entity.toJSON().weight,
        embargo: entity.toJSON().embargo,
        createdAt: entity.toJSON().createdAt,
        coordinates: entity.toJSON().coordinates,
      },
    });
    const output = await sut.findById(tower.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new tower with foundations empty', async () => {
    const entity = new TowerEntity(props);
    await sut.insert(entity);
    const result = await prismaService.tower.findUnique({
      where: {
        id: entity._id,
      },
      include: {
        foundations: true,
      },
    });
    expect(result).toStrictEqual({
      id: entity.toJSON().id,
      code: entity.toJSON().code,
      tower: entity.toJSON().tower,
      type: entity.toJSON().type,
      distance: entity.toJSON().distance,
      height: entity.toJSON().height,
      weight: entity.toJSON().weight,
      foundations: entity.toJSON().foundations,
      embargo: entity.toJSON().embargo,
      createdAt: entity.toJSON().createdAt,
      coordinates: entity.toJSON().coordinates,
    });
  });

  it('should returns all tower', async () => {
    const entity = new TowerEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a tower not found', async () => {
    const entity = new TowerEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`TowerModel not found ID ${entity._id}`),
    );
  });

  it('should update a tower', async () => {
    const entity = new TowerEntity(props);
    const tower = await prismaService.tower.create({
      data: {
        id: entity.toJSON().id,
        code: entity.toJSON().code,
        tower: entity.toJSON().tower,
        type: entity.toJSON().type,
        distance: entity.toJSON().distance,
        height: entity.toJSON().height,
        weight: entity.toJSON().weight,
        embargo: entity.toJSON().embargo,
        createdAt: entity.toJSON().createdAt,
        coordinates: entity.toJSON().coordinates,
      },
    });
    entity.update({
      ...props,
      tower: '9/1',
      type: 'SL',
    });
    await sut.update(entity);
    const output = await sut.findById(tower.id);
    expect(output.type).toBe('SL');
    expect(output.tower).toBe('9/1');
  });

  it('should throws error on delete when a tower not found', async () => {
    const entity = new TowerEntity(towerDataBuilder({}));
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`TowerModel not found ID ${entity._id}`),
    );
  });

  it('should delete a tower', async () => {
    const entity = new TowerEntity(towerDataBuilder({}));
    await prismaService.tower.create({
      data: {
        id: entity.toJSON().id,
        code: entity.toJSON().code,
        tower: entity.toJSON().tower,
        type: entity.toJSON().type,
        distance: entity.toJSON().distance,
        height: entity.toJSON().height,
        weight: entity.toJSON().weight,
        embargo: entity.toJSON().embargo,
        createdAt: entity.toJSON().createdAt,
        coordinates: entity.toJSON().coordinates,
      },
    });
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const entity = new TowerEntity(props);
      await sut.insert(entity);

      const searchOutput = await sut.search(new TowerRepository.SearchParams());

      expect(searchOutput).toBeInstanceOf(TowerRepository.SearchResult);
      expect(searchOutput.total).toBe(1);
      expect(searchOutput.items.length).toBe(1);
      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(TowerEntity);
      });
    });

    // it('should search using filter sort and paginate', async () => {
    //   const createdAt = new Date();
    //   const entities: TowerEntity[] = [];
    //   const arrange = ['test', 'a', 'TEST', 'b', 'TeSt'];
    //   arrange.forEach((element, index) => {
    //     entities.push(
    //       new TowerEntity({
    //         ...towerDataBuilder({ type: element, foundations: [] }),
    //         createdAt: new Date(createdAt.getTime() + index),
    //       }),
    //     );
    //   });

    //   await prismaService.tower.createMany({
    //     data: entities.map(item => item.toJSON()),
    //   });

    //   const searchOutputPage1 = await sut.search(
    //     new TowerRepository.SearchParams({
    //       page: 1,
    //       perPage: 2,
    //       sort: 'type',
    //       sortDir: 'asc',
    //       filter: 'TEST',
    //     }),
    //   );

    //   expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
    //     entities[0].toJSON(),
    //   );

    //   expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
    //     entities[4].toJSON(),
    //   );

    // const searchOutputPage2 = await sut.search(
    //   new TowerRepository.SearchParams({
    //     page: 2,
    //     perPage: 2,
    //     sort: 'type',
    //     sortDir: 'asc',
    //     filter: 'TEST',
    //   }),
    // );

    // expect(searchOutputPage2.items[0].toJSON()).toMatchObject(
    //   entities[2].toJSON(),
    // );
    // });
  });
});
