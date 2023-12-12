import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  EquipmentEntity,
  EquipmentProps,
} from '@/equipments/domain/entities/equipments.entity';
import { EquipmentPrismaRepository } from '../equipment-prisma.repository';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/equipment-data-builder';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';

describe('EquipmentPrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: EquipmentProps;
  let sut: EquipmentPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new EquipmentPrismaRepository(prismaService as any);
    props = equipmentDataBuilder({});
    await prismaService.equipment.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('EquipmentModel not found ID fakeId'),
    );
  });

  it('should finds a equipment by id', async () => {
    const entity = new EquipmentEntity(props);
    const equipment = await prismaService.equipment.create({
      data: entity.toJSON(),
    });
    const output = await sut.findById(equipment.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new equipment', async () => {
    const entity = new EquipmentEntity(props);
    await sut.insert(entity);
    const result = await prismaService.equipment.findUnique({
      where: {
        id: entity._id,
      },
    });
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should returns all equipment', async () => {
    const entity = new EquipmentEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a equipment not found', async () => {
    const entity = new EquipmentEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`EquipmentModel not found ID ${entity._id}`),
    );
  });

  it('should update a equipment', async () => {
    const entity = new EquipmentEntity(props);
    const equipment = await prismaService.equipment.create({
      data: entity.toJSON(),
    });
    entity.update({
      ...props,
      model: 'City',
      manufacturer: 'Honda',
    });
    await sut.update(entity);
    const output = await sut.findById(equipment.id);
    expect(output.model).toBe('City');
    expect(output.manufacturer).toBe('Honda');
  });

  it('should throws error on delete when a equipment not found', async () => {
    const entity = new EquipmentEntity(equipmentDataBuilder({}));
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`EquipmentModel not found ID ${entity._id}`),
    );
  });

  it('should delete a equipment', async () => {
    const entity = new EquipmentEntity(equipmentDataBuilder({}));
    await prismaService.equipment.create({
      data: entity.toJSON(),
    });
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createdAt = new Date();
      const entities: EquipmentEntity[] = [];
      const arrange = Array(16).fill(props);
      arrange.forEach((element, index) => {
        entities.push(
          new EquipmentEntity({
            ...element,
            model: `${index}-Opala`,
            licensePlate: `${index}-AAA-${index + 2}`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.equipment.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const output = await sut.search(new EquipmentRepository.SearchParams());
      const items = output.items;
      expect(output).toBeInstanceOf(EquipmentRepository.SearchResult);
      expect(output.total).toBe(16);
      expect(output.items.length).toBe(15);
      output.items.forEach(item => {
        expect(item).toBeInstanceOf(EquipmentEntity);
      });
      items.reverse().forEach((item, index) => {
        expect(`${index + 1}-Opala`).toBe(item.model);
      });
    });

    it('should search using filter sort and paginate', async () => {
      const createdAt = new Date();
      const entities: EquipmentEntity[] = [];
      const arrange = ['test', 'a', 'TEST', 'b', 'TeSt'];
      arrange.forEach((element, index) => {
        entities.push(
          new EquipmentEntity({
            ...equipmentDataBuilder({ model: element }),
            registration: `VI-${index + 100}`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.equipment.createMany({
        data: entities.map(item => item.toJSON()),
      });

      const searchOutputPage1 = await sut.search(
        new EquipmentRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'model',
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
        new EquipmentRepository.SearchParams({
          page: 2,
          perPage: 2,
          sort: 'model',
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
