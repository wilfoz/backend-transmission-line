import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetTeamUseCase } from '../get-team.usecase';
import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';

describe('GetTeamUseCase Unit Tests', () => {
  let sut: GetTeamUseCase.UseCase;
  let repository: TeamInMemoryRepository;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new GetTeamUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a team', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new TeamEntity(teamDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      employees: items[0].employees,
      equipments: items[0].equipments,
      createdAt: items[0].createdAt,
    });
  });
});
