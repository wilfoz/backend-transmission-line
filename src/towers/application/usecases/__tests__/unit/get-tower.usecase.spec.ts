import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { GetTowerUseCase } from '../../get-tower.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { FoundationInMemoryRepository } from '../../../../../foundations/infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../../../foundations/domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../../../foundations/domain/helpers/foundation-data-builder';

describe('GetTowerUseCase Unit Tests', () => {
  let sut: GetTowerUseCase.UseCase;
  let tower_repository: TowerInMemoryRepository;
  let foundation_repository: FoundationInMemoryRepository;

  beforeEach(() => {
    tower_repository = new TowerInMemoryRepository();
    foundation_repository = new FoundationInMemoryRepository();
    sut = new GetTowerUseCase.UseCase(tower_repository, foundation_repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a tower', async () => {
    const spyFindById = jest.spyOn(tower_repository, 'findById');

    const foundation = new FoundationEntity(foundationDataBuilder({}));
    await foundation_repository.insert(foundation);

    const items = [
      new TowerEntity(towerDataBuilder({ foundations: [foundation.id] })),
    ];
    tower_repository.items = items;

    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      code: items[0].code,
      tower: items[0].tower,
      coordinates: items[0].coordinates.value,
      height: items[0].height,
      weight: items[0].weight,
      foundations: [
        {
          id: foundation.id,
          project: foundation.project,
          revision: foundation.revision,
          description: foundation.description,
          excavation_volume: foundation.excavation_volume,
          concrete_volume: foundation.concrete_volume,
          backfill_volume: foundation.backfill_volume,
          steel_volume: foundation.steel_volume,
        },
      ],
      embargo: items[0].embargo,
      createdAt: items[0].createdAt,
    });
  });
});
