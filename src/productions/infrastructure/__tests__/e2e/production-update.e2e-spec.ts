import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { applyGlobalConfig } from '@/global-config';
import { ProductionRepository } from '../../../domain/repositories/production.repository';
import { UpdateProductionDto } from '../../dto/update-production.dto';
import {
  ProductionEntity,
  STATUS_PRODUCTION,
} from '../../../domain/entities/production.entity';
import { ProductionsModule } from '../../productions.module';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';

describe('ProductionsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: ProductionRepository.Repository;
  let updateUserDto: UpdateProductionDto;
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

    updateUserDto = {
      status: 'EXECUTED' as STATUS_PRODUCTION,
      comments: 'comentarios atualizados',
      startTime: new Date(),
      finalTime: new Date(),
      teams: [],
      towers: [],
      taskId: '2d1b34f6-09e1-4366-8fa5-4bd3f427ad51',
    };

    await prismaService.task.create({
      data: {
        id: updateUserDto.taskId,
        code: 1,
        name: 'Locação de torre',
        group: 'CIVIL',
        stage: 'Montagem',
        unit: 'torre',
      },
    });

    entity = new ProductionEntity(
      productionDataBuilder({
        teams: [],
        towers: [],
        taskId: '2d1b34f6-09e1-4366-8fa5-4bd3f427ad51',
      }),
    );
    await repository.insert(entity);
  });

  describe('PUT/production/:id', () => {
    it('should update production', async () => {
      const res = await request(app.getHttpServer())
        .put(`/production/${entity._id}`)
        .send(updateUserDto)
        .expect(200)
        .expect({
          data: {
            id: entity._id,
            status: 'EXECUTED' as STATUS_PRODUCTION,
            comments: 'comentarios atualizados',
            startTime: updateUserDto.startTime.toISOString(),
            finalTime: updateUserDto.finalTime.toISOString(),
            teams: [],
            towers: [],
            taskId: '2d1b34f6-09e1-4366-8fa5-4bd3f427ad51',
            createdAt: entity.createdAt.toISOString(),
          },
        });
    });

    // it('should return error with 404 code when throw NotFoundError with invalid id', async () => {
    //   const res = await request(app.getHttpServer())
    //     .put('/production/fakeId')
    //     .send(updateUserDto)
    //     .expect(404)
    //     .expect({
    //       statusCode: 404,
    //       error: 'Not Found',
    //       message: 'ProductionModel not found ID fakeId',
    //     });
    // });
  });
});
