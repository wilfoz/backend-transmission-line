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
    entity = new TeamEntity(teamDataBuilder({}));
    await repository.insert(entity);
  });

  describe('GET/team/:id', () => {
    it('should get a team', async () => {
      const res = await request(app.getHttpServer())
        .get(`/team/${entity._id}`)
        .expect(200);
      const presenter = TeamsController.teamToResponse(entity.toJSON());
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });

    it('should return error with 404 code when throw NotFoundError with invalid id', async () => {
      const res = await request(app.getHttpServer())
        .get('/team/fakeId')
        .expect(404)
        .expect({
          message: 'TeamModel not found ID fakeId',
          error: 'Not Found',
          statusCode: 404,
        });
    });
  });
});
