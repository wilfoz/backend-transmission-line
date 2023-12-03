import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { applyGlobalConfig } from '@/global-config';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { CreateTeamDto } from '../../dto/create-team.dto';
import { TeamsModule } from '../../teams.module';
import { TeamsController } from '../../teams.controller';

describe('TeamsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: TeamRepository.Repository;
  let createDto: CreateTeamDto;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [
        EnvConfigModule,
        TeamsModule,
        DatabaseModule.forTest(prismaService),
      ],
    }).compile();
    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();
    repository = module.get<TeamRepository.Repository>('TeamRepository');
  });

  beforeEach(async () => {
    createDto = {
      name: 'Lançamento',
      employees: [],
      equipments: [],
    };
    await prismaService.team.deleteMany();
  });

  describe('POST/team', () => {
    it('should create team', async () => {
      const res = await request(app.getHttpServer())
        .post('/team')
        .send(createDto)
        .expect(201);
      expect(Object.keys(res.body)).toStrictEqual(['data']);

      const team = await repository.findById(res.body.data.id);
      const presenter = TeamsController.teamToResponse(team.toJSON());
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });

    it('should return error with 422 code when the request body is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/team')
        .send({})
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual([
        'name should not be empty',
        'name must be a string',
      ]);
    });

    it('should return error with 422 code when the name field is invalid', async () => {
      delete createDto.name;
      const res = await request(app.getHttpServer())
        .post('/team')
        .send(createDto)
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual([
        'name should not be empty',
        'name must be a string',
      ]);
    });

    it('should return error with 422 code with invalid field provided', async () => {
      const res = await request(app.getHttpServer())
        .post('/team')
        .send(Object.assign(createDto, { xpto: 'fake' }))
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual(['property xpto should not exist']);
    });
  });
});
