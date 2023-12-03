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
import { TeamEntity } from '../../../domain/entities/team.entity';
import { TeamsModule } from '../../teams.module';
import { teamDataBuilder } from '../../../domain/helpers/team-data-builder';
import { TeamsController } from '../../teams.controller';

describe('TeamsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: TeamRepository.Repository;
  const prismaService = new PrismaClient();
  let entity: TeamEntity;

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
    await prismaService.team.deleteMany();
  });

  describe('GET/team', () => {
    it('should return the teams ordered by createdAt', async () => {
      const createdAt = new Date();
      const entities: TeamEntity[] = [];
      const arrange = Array(3).fill(teamDataBuilder({}));
      arrange.forEach((element, index) => {
        entities.push(
          new TeamEntity({
            ...element,
            name: `equip-${index}`,
            createdAt: new Date(createdAt.getTime() + index),
          }),
        );
      });

      await prismaService.team.createMany({
        data: entities.map(item => ({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt,
        })),
      });

      const searchParams = {};
      const queryParams = new URLSearchParams(searchParams as any).toString();
      const res = await request(app.getHttpServer())
        .get(`/team/?${queryParams}`)
        .expect(200);
      expect(Object.keys(res.body)).toStrictEqual(['data', 'meta']);
      expect(res.body).toStrictEqual({
        data: [...entities]
          .reverse()
          .map(item => instanceToPlain(TeamsController.teamToResponse(item))),
        meta: {
          total: 3,
          currentPage: 1,
          perPage: 15,
          lastPage: 1,
        },
      });
    });

    it('should return the teams ordered by createdAt', async () => {
      const entities: TeamEntity[] = [];
      const arrange = ['test', 'a', 'TEST', 'Test'];
      arrange.forEach((element, index) => {
        entities.push(
          new TeamEntity({
            ...teamDataBuilder({}),
            name: element,
          }),
        );
      });
      await prismaService.team.createMany({
        data: entities.map(item => ({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt,
        })),
      });
      const searchParams = {
        page: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'TEST',
      };
      const queryParams = new URLSearchParams(searchParams as any).toString();
      const res = await request(app.getHttpServer())
        .get(`/team/?${queryParams}`)
        .expect(200);
      expect(Object.keys(res.body)).toStrictEqual(['data', 'meta']);
    });

    it('should return error with 422 code when the query params is invalid', async () => {
      const res = await request(app.getHttpServer())
        .get('/team/?fakeId=10')
        .expect(422);
      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual(['property fakeId should not exist']);
    });
  });
});
