import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TeamEntity, TeamProps } from '@/teams/domain/entities/team.entity';
import { TeamPrismaRepository } from '../team-prisma.repository';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import { TeamRepository } from '../../../../domain/repositories/team.repository';

describe('TeamPrismaRepository Integration tests', () => {
  const prismaService = new PrismaClient();
  let props: TeamProps;
  let sut: TeamPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new TeamPrismaRepository(prismaService as any);
    props = teamDataBuilder({});
    await prismaService.team.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    await expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('TeamModel not found ID fakeId'),
    );
  });

  it('should finds a team by id', async () => {
    const entity = new TeamEntity(props);
    const { id, name, createdAt } = entity.toJSON();
    const team = await prismaService.team.create({
      data: {
        id,
        name,
        createdAt,
      },
    });
    const output = await sut.findById(team.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should insert a new team', async () => {
    const entity = new TeamEntity(props);
    await sut.insert(entity);
    const result = await prismaService.team.findUnique({
      where: {
        id: entity._id,
      },
      include: {
        employees: true,
        equipments: true,
      },
    });
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should returns all teams', async () => {
    const entity = new TeamEntity(props);
    await sut.insert(entity);
    const entities = await sut.findAll();
    expect(entities).toHaveLength(1);
    entities.map(item => {
      expect(item.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  it('should throws error on update when a team not found', async () => {
    const entity = new TeamEntity(props);
    await expect(() => sut.update(entity)).rejects.toThrow(
      new NotFoundError(`TeamModel not found ID ${entity._id}`),
    );
  });

  it('should update a team', async () => {
    const entity = new TeamEntity(props);
    const entityJsonData = entity.toJSON();
    const team = await prismaService.team.create({
      data: {
        id: entityJsonData.id,
        name: entityJsonData.name,
        createdAt: entityJsonData.createdAt,
      },
    });
    entity.update('Acesso');
    await sut.update(entity);
    const output = await sut.findById(team.id);
    expect(output.name).toBe('Acesso');
  });

  it('should throws error on delete when a team not found', async () => {
    const entity = new TeamEntity(teamDataBuilder({}));
    await expect(() => sut.delete(entity._id)).rejects.toThrow(
      new NotFoundError(`TeamModel not found ID ${entity._id}`),
    );
  });

  it('should delete a team', async () => {
    const entity = new TeamEntity(teamDataBuilder({}));
    const { id, name, createdAt } = entity.toJSON();
    await prismaService.team.create({
      data: {
        id,
        name,
        createdAt,
      },
    });
    await sut.delete(entity._id);
    const output = await sut.findAll();
    expect(output.length).toBe(0);
  });

  describe('search method tests', () => {
    it('should apply only pagination when the other params are null', async () => {
      const createdAt = new Date();
      const entities: TeamEntity[] = [];
      const arrange = Array(16).fill(props);
      arrange.forEach((element, index) => {
        entities.push(
          new TeamEntity({
            ...element,
            name: `name${index}-employee`,
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

      const searchOutput = await sut.search(new TeamRepository.SearchParams());
      const items = searchOutput.items;
      expect(searchOutput).toBeInstanceOf(TeamRepository.SearchResult);
      expect(searchOutput.total).toBe(16);
      expect(searchOutput.items.length).toBe(15);
      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(TeamEntity);
      });
      items.reverse().forEach((item, index) => {
        expect(`name${index + 1}-employee`).toBe(item.name);
      });
    });

    it('should search using filter sort and paginate', async () => {
      const createdAt = new Date();
      const entities: TeamEntity[] = [];
      const arrange = ['test', 'a', 'TEST', 'b', 'TeSt'];
      arrange.forEach((element, index) => {
        entities.push(
          new TeamEntity({
            ...teamDataBuilder({ name: element }),
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

      const searchOutputPage1 = await sut.search(
        new TeamRepository.SearchParams({
          page: 1,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      );

      expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
        entities[0].toJSON(),
      );

      expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
        entities[4].toJSON(),
      );

      const searchOutputPage2 = await sut.search(
        new TeamRepository.SearchParams({
          page: 2,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
          filter: 'TEST',
        }),
      );

      expect(searchOutputPage2.items[0].toJSON()).toMatchObject(
        entities[2].toJSON(),
      );
    });
  });
});
