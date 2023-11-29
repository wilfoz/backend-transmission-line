import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteTeamUseCase } from '../delete-team.usecase';
import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';

describe('DeleteTeamUseCase Unit Tests', () => {
  let sut: DeleteTeamUseCase.UseCase;
  let repository: TeamInMemoryRepository;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new DeleteTeamUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a Team', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new TeamEntity(teamDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
