import { Equipment, PrismaClient } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EquipmentModelMapper } from '../equipment-model.mapper';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';

describe('EquipmentModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.equipment.deleteMany();
    props = {
      id: '7839cf9b-cef5-4c33-b68a-f4cefde5fe94',
      registration: '1',
      model: 'Fiat 47',
      manufacturer: 'Ajudante',
      licensePlate: 'AAA:2133',
      provider: 'Fiat',
      status: 'ACTIVE',
      teamId: null,
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when equipment model is invalid', async () => {
    const model: Equipment = Object.assign(props, { model: null });
    expect(() => EquipmentModelMapper.toEntity(model)).toThrowError(
      ValidationError,
    );
  });

  it('should convert a equipment model to a equipment entity', async () => {
    const model: Equipment = await prismaService.equipment.create({
      data: props,
    });
    const sut = EquipmentModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(EquipmentEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
