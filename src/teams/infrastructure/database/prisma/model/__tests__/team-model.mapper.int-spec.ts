import { Employee, Equipment, PrismaClient, Team } from '@prisma/client';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { TeamModelMapper } from '../team-model.mapper';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';

describe('TeamModelMapper Integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.team.deleteMany();
    props = new TeamEntity(teamDataBuilder({})).toJSON();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when team model is invalid', async () => {
    const model: Required<
      {
        employees: Employee[];
        equipments: Equipment[];
      } & Team
    > = Object.assign(props, { name: null });
    expect(() => TeamModelMapper.toEntity(model)).toThrowError(ValidationError);
  });

  it('should convert a team model to a team entity', async () => {
    const model: Required<
      {
        employees: Employee[];
        equipments: Equipment[];
      } & Team
    > = await prismaService.team.create({
      data: {
        id: props.id,
        name: props.name,
        createdAt: props.createdAt,
      },
      include: {
        employees: true,
        equipments: true,
      },
    });
    const sut = TeamModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(TeamEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
