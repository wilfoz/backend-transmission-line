import { Foundation, PrismaClient, Tower } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { TowerModelMapper } from '../tower-model.mapper';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '../../../../../domain/helpers/tower-data-builder';

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
    props = new TowerEntity(towerDataBuilder({})).toJSON();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when tower model is invalid', async () => {
    const model: Required<
      {
        foundations: Foundation[];
      } & Tower
    > = Object.assign(props, { tower: null });
    expect(() => TowerModelMapper.toEntity(model)).toThrowError(
      ValidationError,
    );
  });

  it('should convert a tower model to a tower entity', async () => {
    const model: Required<
      {
        foundations: Foundation[];
      } & Tower
    > = await prismaService.tower.create({
      data: {
        id: props.id,
        code: props.code,
        tower: props.tower,
        type: props.type,
        coordinates: props.coordinates,
        distance: props.distance,
        height: props.height,
        weight: props.weight,
        embargo: props.embargo,
        createdAt: props.createdAt,
      },
      include: {
        foundations: true,
      },
    });
    const sut = TowerModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(TowerEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
