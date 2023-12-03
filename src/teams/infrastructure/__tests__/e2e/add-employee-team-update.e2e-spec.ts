import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { applyGlobalConfig } from '@/global-config';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { TeamEntity } from '../../../domain/entities/team.entity';
import { TeamsModule } from '../../teams.module';
import { teamDataBuilder } from '../../../domain/helpers/team-data-builder';

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

  describe('PUT/team/add-employee/:id', () => {
    it('should update employeeId', async () => {
      const employeeId = '6ae6e322-b1bf-4fda-abf7-e93758e0a8a7';

      const updateResourceTeamDto = {
        id: entity._id,
        name: entity.name,
        employees: [],
        equipments: [],
      };

      await request(app.getHttpServer())
        .put(`/team/add-employee/${employeeId}`)
        .send(updateResourceTeamDto)
        .expect(200)
        .expect({
          data: {
            id: entity._id,
            name: entity.name,
            employees: ['6ae6e322-b1bf-4fda-abf7-e93758e0a8a7'],
            equipments: [],
            createdAt: entity.createdAt.toISOString(),
          },
        });
    });

    it('should return error with 404 code when throw NotFoundError with invalid id', async () => {
      const employeeId = '6ae6e322-b1bf-4fda-abf7-e93758e0a8a7';
      const updateResourceTeamDto = {
        id: 'fake-id',
        name: entity.name,
        employees: [],
        equipments: [],
      };
      await request(app.getHttpServer())
        .put(`/team/add-employee/${employeeId}`)
        .send(updateResourceTeamDto)
        .expect(404)
        .expect({
          statusCode: 404,
          error: 'Not Found',
          message: 'TeamModel not found ID fake-id',
        });
    });
  });
});
