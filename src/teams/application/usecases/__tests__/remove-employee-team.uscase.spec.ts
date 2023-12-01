import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import { RemoveEmployeeTeamUseCase } from '../remove-employee-team.usecase';

describe('RemoveEmployeeTeamUseCase Unit Tests', () => {
  let sut: RemoveEmployeeTeamUseCase.UseCase;
  let repository: TeamInMemoryRepository;
  let entity: TeamEntity;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new RemoveEmployeeTeamUseCase.UseCase(repository);
    entity = new TeamEntity(teamDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const input = {
      team: entity,
      employeeId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };
    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should trows error employee not found', async () => {
    const items = [new TeamEntity(teamDataBuilder({}))];
    const input = {
      team: items[0],
      employeeId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };

    repository.items = items;

    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Employee does not exist!'),
    );
  });

  it('Should remove a employeeId in team', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [
      new TeamEntity(
        teamDataBuilder({
          employees: ['96010fff-fc27-406c-bba0-44182c7b67a0'],
        }),
      ),
    ];
    repository.items = items;

    const input = {
      team: items[0],
      employeeId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };

    const result = await sut.execute(input);
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      employees: [],
      equipments: items[0].getEquipments(),
      createdAt: items[0].createdAt,
    });
  });
});
