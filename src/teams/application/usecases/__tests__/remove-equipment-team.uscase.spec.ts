import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TeamInMemoryRepository } from '@/teams/infrastructure/database/in-memory/team-in-memory.repository';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import { RemoveEquipmentTeamUseCase } from '../remove-equipment-team.usecase';

describe('RemoveEquipmentTeamUseCase Unit Tests', () => {
  let sut: RemoveEquipmentTeamUseCase.UseCase;
  let repository: TeamInMemoryRepository;
  let entity: TeamEntity;

  beforeEach(() => {
    repository = new TeamInMemoryRepository();
    sut = new RemoveEquipmentTeamUseCase.UseCase(repository);
    entity = new TeamEntity(teamDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const input = {
      id: entity.id,
      name: entity.name,
      employees: entity.employees,
      equipments: entity.equipments,
      equipmentId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };
    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should trows error equipment not found', async () => {
    const items = [new TeamEntity(teamDataBuilder({}))];
    const input = {
      id: items[0].id,
      name: items[0].name,
      employees: items[0].employees,
      equipments: items[0].equipments,
      equipmentId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };

    repository.items = items;

    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Equipment does not exist!'),
    );
  });

  it('Should remove a equipmentId in team', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [
      new TeamEntity(
        teamDataBuilder({
          equipments: ['96010fff-fc27-406c-bba0-44182c7b67a0'],
        }),
      ),
    ];
    repository.items = items;

    const input = {
      id: items[0].id,
      name: items[0].name,
      employees: items[0].employees,
      equipments: items[0].equipments,
      equipmentId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };

    const result = await sut.execute(input);
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      employees: items[0].getEquipments(),
      equipments: [],
      createdAt: items[0].createdAt,
    });
  });
});
