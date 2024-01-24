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
import { CreateProductionDto } from '../../dto/create-production.dto';
import { ProductionsModule } from '../../productions.module';
import { ProductionsController } from '../../productions.controller';
import { STATUS_PRODUCTION } from '../../../domain/entities/production.entity';

describe('ProductionsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: ProductionRepository.Repository;
  let createDto: CreateProductionDto;
  let task: any;
  const prismaService = new PrismaClient();

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
    createDto = {
      status: 'EXECUTED' as STATUS_PRODUCTION,
      comments: 'Pré-montagem',
      startTime: new Date(),
      finalTime: new Date(),
      teams: [],
      towers: [],
      taskId: '2d1b34f6-09e1-4366-8fa5-4bd3f427ad51',
    };
    task = await prismaService.task.create({
      data: {
        id: createDto.taskId,
        code: 1,
        name: 'Locação de torre',
        group: 'CIVIL',
        stage: 'Montagem',
        unit: 'torre',
      },
    });
  });

  describe('POST/production', () => {
    it('should create production', async () => {
      const res = await request(app.getHttpServer())
        .post('/production')
        .send(createDto)
        .expect(201);
      expect(Object.keys(res.body)).toStrictEqual(['data']);

      const production = await repository.findById(res.body.data.id);
      const presenter = ProductionsController.productionToResponse(
        production.toJSON(),
      );
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });

    it('should return error with 422 code when the request body is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/production')
        .send({})
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual([
        'status should not be empty',
        'status must be a string',
        'comments should not be empty',
        'comments must be a string',
        'taskId should not be empty',
        'taskId must be a string',
      ]);
    });

    it('should return error with 422 code with invalid field provided', async () => {
      const res = await request(app.getHttpServer())
        .post('/production')
        .send(Object.assign(createDto, { xpto: 'fake' }))
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual(['property xpto should not exist']);
    });
  });
});
