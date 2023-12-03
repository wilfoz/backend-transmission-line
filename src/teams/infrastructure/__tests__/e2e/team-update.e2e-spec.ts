import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import request from 'supertest';
import { applyGlobalConfig } from '@/global-config';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import { TeamEntity } from '../../../domain/entities/team.entity';
import { TeamsModule } from '../../teams.module';
import { teamDataBuilder } from '../../../domain/helpers/team-data-builder';

describe('TeamsController E2E Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: TeamRepository.Repository;
  let updateUserDto: UpdateTeamDto;
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
    updateUserDto = {
      name: 'equip-01',
      employees: [],
      equipments: [],
    };
    entity = new TeamEntity(teamDataBuilder({}));
    await repository.insert(entity);
  });

  describe('PUT/team/:id', () => {
    it('should update team', async () => {
      updateUserDto.name = 'equip-02';
      const res = await request(app.getHttpServer())
        .put(`/team/${entity._id}`)
        .send(updateUserDto)
        .expect(200)
        .expect({
          data: {
            id: entity._id,
            name: 'equip-02',
            employees: [],
            equipments: [],
            createdAt: entity.createdAt.toISOString(),
          },
        });
    });

    // it('should return error with 404 code when throw NotFoundError with invalid id', async () => {
    //   const res = await request(app.getHttpServer())
    //     .put('/team/fakeId')
    //     .send(updateUserDto)
    //     .expect(404)
    //     .expect({
    //       message: 'Cannot PUT /team/fakeId',
    //       error: 'Not Found',
    //       statusCode: 404,
    //     });
    // });
  });
});
