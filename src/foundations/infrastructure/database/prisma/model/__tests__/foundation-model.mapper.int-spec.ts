import { Foundation, PrismaClient } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { FoundationModelMapper } from '../foundation-model.mapper';
import { FoundationEntity } from '../../../../../domain/entities/foundation.entity';

describe('FoundationModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.foundation.deleteMany();
    props = {
      id: '7839cf9b-cef5-4c33-b68a-f4cefde5fe94',
      project: 'AT-FUN-MCA-0001',
      revision: '0A',
      description: 'AT-TCB-AFL-0.5',
      excavation_volume: 20,
      concrete_volume: 15,
      backfill_volume: 18,
      steel_volume: 1000,
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when foundation model is invalid', async () => {
    const model: Foundation = Object.assign(props, { description: null });
    expect(() => FoundationModelMapper.toEntity(model)).toThrowError(
      ValidationError,
    );
  });

  it('should convert a foundation model to a foundation entity', async () => {
    const model: Foundation = await prismaService.foundation.create({
      data: props,
    });
    const sut = FoundationModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(FoundationEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
