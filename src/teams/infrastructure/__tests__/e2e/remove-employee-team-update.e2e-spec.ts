import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Employee, PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { applyGlobalConfig } from '@/global-config';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { TeamEntity } from '../../../domain/entities/team.entity';
import { TeamsModule } from '../../teams.module';
import { teamDataBuilder } from '../../../domain/helpers/team-data-builder';
import { employeeDataBuilder } from '../../../../employees/domain/helpers/employee-data-builder';
import { EmployeeEntity } from '../../../../employees/domain/entities/employee.entity';

describe('TeamsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: TeamRepository.Repository;
  const prismaService = new PrismaClient();
  let entity: TeamEntity;
  let employee: EmployeeEntity;

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
    await prismaService.employee.deleteMany();

    employee = new EmployeeEntity(employeeDataBuilder({}));
    const result = await prismaService.employee.create({
      data: employee.toJSON(),
    });

    entity = new TeamEntity(teamDataBuilder({ employees: [result.id] }));
    await repository.insert(entity);
  });

  describe('PUT/team/del-employee/:id', () => {
    it('should remove employeeId in team', async () => {
      const employeeId = employee.id;

      const updateResourceTeamDto = {
        id: entity._id,
        name: entity.name,
        employees: [employeeId],
        equipments: [],
      };

      const res = await request(app.getHttpServer())
        .put(`/team/del-employee/${employeeId}`)
        .send(updateResourceTeamDto)
        .expect(200)
        .expect({
          data: {
            id: entity._id,
            name: entity.name,
            employees: [employeeId],
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
        .put(`/team/del-employee/${employeeId}`)
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
