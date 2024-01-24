import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { UpdateTowerUseCase } from '../../update-tower.usecase';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { TowerEntity } from '../../../../domain/entities/towers.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FoundationInMemoryRepository } from '../../../../../foundations/infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../../../foundations/domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../../../foundations/domain/helpers/foundation-data-builder';

describe('UpdateTowerUseCase Unit Tests', () => {
  let sut: UpdateTowerUseCase.UseCase;
  let tower_repository: TowerInMemoryRepository;
  let foundation_repository: FoundationInMemoryRepository;

  beforeEach(() => {
    tower_repository = new TowerInMemoryRepository();
    foundation_repository = new FoundationInMemoryRepository();
    sut = new UpdateTowerUseCase.UseCase(
      tower_repository,
      foundation_repository,
    );

    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const foundation = new FoundationEntity(foundationDataBuilder({}));
    await foundation_repository.insert(foundation);

    const entity = new TowerEntity(
      towerDataBuilder({ foundations: [foundation.id] }),
    );

    await expect(() =>
      sut.execute({
        id: entity.id,
        code: entity.code,
        tower: entity.tower,
        type: entity.type,
        coordinates: entity.coordinates.value,
        distance: entity.distance,
        height: entity.height,
        weight: entity.weight,
        embargo: entity.embargo,
        foundations: entity.foundations,
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should update tower', async () => {
    const spyUpdate = jest.spyOn(tower_repository, 'update');

    const foundation = new FoundationEntity(foundationDataBuilder({}));
    await foundation_repository.insert(foundation);

    const items = [
      new TowerEntity(towerDataBuilder({ foundations: [foundation.id] })),
    ];

    tower_repository.items = items;

    const output = await sut.execute({
      id: items[0].id,
      code: items[0].code,
      tower: '100/1',
      type: items[0].type,
      coordinates: { latitude: '0000', longitude: '00000' },
      distance: items[0].distance,
      height: items[0].height,
      weight: items[0].weight,
      embargo: items[0].embargo,
      foundations: items[0].foundations,
    });

    expect(spyUpdate).toHaveBeenCalled();
    expect(output).toMatchObject({
      id: items[0].id,
      code: items[0].code,
      tower: '100/1',
      type: items[0].type,
      coordinates: { latitude: '0000', longitude: '00000' },
      height: items[0].height,
      weight: items[0].weight,
      embargo: items[0].embargo,
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
      createdAt: items[0].createdAt,
    });
  });
});
