import { PrismaClient, Tower } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { TowerModelMapper } from '../tower-model.mapper';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';

describe('TowerModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.tower.deleteMany();
    props = {
      id: '7839cf9b-cef5-4c33-b68a-f4cefde5fe94',
      code: 1,
      tower: '0/2',
      type: 'AT',
      coordinates: { latitude: '123', longitude: '456' },
      distance: 200,
      height: 30,
      weight: 1000,
      type_of_foundation_A: 'T',
      type_of_foundation_B: 'T',
      type_of_foundation_C: 'T',
      type_of_foundation_D: 'T',
      type_of_foundation_MC: 'T',
      embargo: 'RELEASE',
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when tower model is invalid', async () => {
    const model: Tower = Object.assign(props, { tower: null });
    expect(() => TowerModelMapper.toEntity(model)).toThrowError(
      ValidationError,
    );
  });

  it('should convert a tower model to a tower entity', async () => {
    const model: Tower = await prismaService.tower.create({
      data: props,
    });
    const sut = TowerModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(TowerEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
