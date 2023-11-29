import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import { ListTeamsUseCase } from '../list-team.usecase';
import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';

describe('ListTeamsUseCase Unit Tests', () => {
  let sut: ListTeamsUseCase.UseCase;
  let repository: TeamInMemoryRepository;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new ListTeamsUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new TeamRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
    const entity = new TeamEntity(teamDataBuilder({}));
    result = new TeamRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });

  it('should return the equipment sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new TeamEntity(teamDataBuilder({ createdAt })),
      new TeamEntity(
        teamDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new TeamEntity(
        teamDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
      ),
    ];

    repository.items = items;
    const output = await sut.execute({});
    expect(output).toStrictEqual({
      items: [...items].map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    });
  });

  it('should return the teams pagination, sorted and filter', async () => {
    const items = [
      new TeamEntity(teamDataBuilder({ name: 'test' })),
      new TeamEntity(teamDataBuilder({ name: 'TEST' })),
      new TeamEntity(teamDataBuilder({ name: 'fake' })),
      new TeamEntity(teamDataBuilder({ name: 'Test' })),
      new TeamEntity(teamDataBuilder({ name: 'FAKE' })),
      new TeamEntity(teamDataBuilder({ name: 'FaKe' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'test',
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[3].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'test',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });
  });
});
