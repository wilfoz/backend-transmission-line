import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UpdateTeamUseCase } from '../update-team.usecase';
import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';

describe('UpdateTeamUseCase Unit Tests', () => {
  let sut: UpdateTeamUseCase.UseCase;
  let repository: TeamInMemoryRepository;
  let entity: TeamEntity;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new UpdateTeamUseCase.UseCase(repository);
    entity = new TeamEntity(teamDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update team', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new TeamEntity(teamDataBuilder({}))];
    repository.items = items;
    items[0].update('Pré-montagem');

    const result = await sut.execute(items[0]);
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'Pré-montagem',
      employees: items[0].employees,
      equipments: items[0].equipments,
      createdAt: items[0].createdAt,
    });
  });
});
