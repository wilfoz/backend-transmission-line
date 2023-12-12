import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { applyGlobalConfig } from '@/global-config';
import { ProductionRepository } from '../../../domain/repositories/production.repository';
import {
  ProductionEntity,
  STATUS_PRODUCTION,
} from '../../../domain/entities/production.entity';
import { ProductionsModule } from '../../productions.module';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';
import { TaskEntity } from '../../../../task/domain/entities/task.entity';
import { taskDataBuilder } from '../../../../task/domain/helpers/task-data-builder';
import { ProductionsController } from '../../productions.controller';

describe('ProductionController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: ProductionRepository.Repository;
  const prismaService = new PrismaClient();
  let tasksEntities: any[];

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

    tasksEntities = [
      new TaskEntity(taskDataBuilder({})),
      new TaskEntity(taskDataBuilder({})),
      new TaskEntity(taskDataBuilder({})),
    ];
  });

  describe('GET/production', () => {
    it('should return the production ordered by createdAt', async () => {
      await prismaService.task.createMany({
        data: tasksEntities.map(task => task),
      });
      const tasks = await prismaService.task.findMany();

      const createdAt = new Date();
      const entities: ProductionEntity[] = [];
      const arrange = Array(3).fill(productionDataBuilder({}));
      arrange.forEach((element, index) => {
        entities.push(
          new ProductionEntity({
            ...element,
            comments: `comentario numero: ${index}`,
            taskId: tasks[index].id,
            teams: [],
            towers: [],
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.production.createMany({
        data: entities.map(item => ({
          id: item._id,
          status: item.status,
          startTime: item.startTime,
          finalTime: item.finalTime,
          comments: item.comments,
          taskId: item.taskId,
          createdAt: item.createdAt,
        })),
      });

      const searchParams = {};
      const queryParams = new URLSearchParams(searchParams as any).toString();
      const res = await request(app.getHttpServer())
        .get(`/production/?${queryParams}`)
        .expect(200);
      expect(Object.keys(res.body)).toStrictEqual(['data', 'meta']);
      expect(res.body).toStrictEqual({
        data: [...entities]
          .reverse()
          .map(item =>
            instanceToPlain(ProductionsController.productionToResponse(item)),
          ),
        meta: {
          total: 3,
          currentPage: 1,
          perPage: 15,
          lastPage: 1,
        },
      });
    });

    it('should return the production ordered by createdAt', async () => {
      await prismaService.task.createMany({
        data: tasksEntities.map(task => task),
      });
      const tasks = await prismaService.task.findMany();
      const entities: ProductionEntity[] = [];
      const arrange = ['PROGRAMMED', 'EXECUTED', 'PROGRESS'];
      arrange.forEach((element, index) => {
        entities.push(
          new ProductionEntity({
            ...productionDataBuilder({ teams: [], towers: [] }),
            status: element as STATUS_PRODUCTION,
            taskId: tasks[index].id,
          }),
        );
      });
      await prismaService.production.createMany({
        data: entities.map(item => ({
          id: item._id,
          status: item.status,
          startTime: item.startTime,
          finalTime: item.finalTime,
          comments: item.comments,
          taskId: item.taskId,
          createdAt: item.createdAt,
        })),
      });
      const searchParams = {
        page: 1,
        perPage: 2,
        sort: 'status',
        sortDir: 'asc',
        filter: 'P',
      };
      const queryParams = new URLSearchParams(searchParams as any).toString();
      const res = await request(app.getHttpServer())
        .get(`/production/?${queryParams}`)
        .expect(200);
      expect(Object.keys(res.body)).toStrictEqual(['data', 'meta']);
    });

    it('should return error with 422 code when the query params is invalid', async () => {
      const res = await request(app.getHttpServer())
        .get('/production/?fakeId=10')
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual(['property fakeId should not exist']);
    });
  });
});
