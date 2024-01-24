import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { applyGlobalConfig } from '@/global-config';
import { ProductionRepository } from '../../../domain/repositories/production.repository';
import { ProductionEntity } from '../../../domain/entities/production.entity';
import { ProductionsModule } from '../../productions.module';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';

describe('ProductionsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: ProductionRepository.Repository;
  const prismaService = new PrismaClient();
  let entity: ProductionEntity;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [
        EnvConfigModule,
        ProductionsModule,
        DatabaseModule.forTest(prismaService),
      ],
    }).compile();
    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();
    repository = module.get<ProductionRepository.Repository>(
      'ProductionRepository',
    );
  });

  beforeEach(async () => {
    await prismaService.production.deleteMany();
    await prismaService.task.deleteMany();

    entity = new ProductionEntity(
      productionDataBuilder({ teams: [], towers: [] }),
    );
    await prismaService.task.create({
      data: {
        id: entity.taskId,
        code: 1,
        name: 'Locação de torre',
        group: 'CIVIL',
        stage: 'Montagem',
        unit: 'torre',
      },
    });
    await repository.insert(entity);
  });

  describe('DELETE/production/:id', () => {
    it('should remove a production', async () => {
      await request(app.getHttpServer())
        .delete(`/production/${entity._id}`)
        .expect(204)
        .expect({});
    });

    it('should return error with 404 code when throw NotFoundError with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .delete('/production/fakeId')
        .expect(404)
        .expect({
          message: 'ProductionModel not found ID fakeId',
          error: 'Not Found',
          statusCode: 404,
        });
    });
  });
});
