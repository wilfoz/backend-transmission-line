import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FoundationEntity,
  FoundationProps,
} from '../../../../domain/entities/foundation.entity';
import { FoundationPrismaRepository } from '../foundation-prisma.repository';
import { foundationDataBuilder } from '../../../../domain/helpers/foundation-data-builder';
import { FoundationRepository } from '../../../../domain/repositories/foundation.repository';

describe('FoundationPrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: FoundationProps;
  let sut: FoundationPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new FoundationPrismaRepository(prismaService as any);
    props = foundationDataBuilder({});
    await prismaService.foundation.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('FoundationModel not found ID fakeId'),
    );
  });

  it('should finds a foundation by id', async () => {
    const entity = new FoundationEntity(props);
    const foundation = await prismaService.foundation.create({
      data: entity.toJSON(),
    });
    const output = await sut.findById(foundation.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new foundation', async () => {
    const entity = new FoundationEntity(props);
    await sut.insert(entity);
    const result = await prismaService.foundation.findUnique({
      where: {
        id: entity._id,
      },
    });
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should returns all foundation', async () => {
    const entity = new FoundationEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a foundation not found', async () => {
    const entity = new FoundationEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`FoundationModel not found ID ${entity._id}`),
    );
  });

  it('should update a foundation', async () => {
    const entity = new FoundationEntity(props);
    const foundation = await prismaService.foundation.create({
      data: entity.toJSON(),
    });
    entity.update({
      ...props,
      project: 'AT-FUN-MCA-0001',
      revision: '0A',
    });
    await sut.update(entity);
    const output = await sut.findById(foundation.id);
    expect(output.project).toBe('AT-FUN-MCA-0001');
    expect(output.revision).toBe('0A');
  });

  it('should throws error on delete when a foundation not found', async () => {
    const entity = new FoundationEntity(foundationDataBuilder({}));
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`FoundationModel not found ID ${entity._id}`),
    );
  });

  it('should delete a foundation', async () => {
    const entity = new FoundationEntity(foundationDataBuilder({}));
    await prismaService.foundation.create({
      data: entity.toJSON(),
    });
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createdAt = new Date();
      const entities: FoundationEntity[] = [];
      const arrange = Array(16).fill(props);
      arrange.forEach((element, index) => {
        entities.push(
          new FoundationEntity({
            ...element,
            description: `AT-TCB-${index + 1}-AFL-0.5`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.foundation.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const output = await sut.search(new FoundationRepository.SearchParams());
      const items = output.items;
      expect(output).toBeInstanceOf(FoundationRepository.SearchResult);
      expect(output.total).toBe(16);
      expect(output.items.length).toBe(15);
      output.items.forEach(item => {
        expect(item).toBeInstanceOf(FoundationEntity);
      });
      items.reverse().forEach((item, index) => {
        expect(`AT-TCB-${index + 2}-AFL-0.5`).toBe(item.description);
      });
    });

    it('should search using filter sort and paginate', async () => {
      const createdAt = new Date();
      const entities: FoundationEntity[] = [];
      const arrange = ['test', 'a', 'TEST', 'b', 'TeSt'];
      arrange.forEach((element, index) => {
        entities.push(
          new FoundationEntity({
            ...foundationDataBuilder({ description: element }),
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.foundation.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const searchOutputPage1 = await sut.search(
        new FoundationRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'description',
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
        new FoundationRepository.SearchParams({
          page: 2,
          perPage: 2,
          sort: 'description',
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
