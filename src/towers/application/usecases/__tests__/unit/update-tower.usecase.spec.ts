import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { UpdateTowerUseCase } from '../../update-tower.usecase';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { TowerEntity } from '../../../../domain/entities/towers.entity';
import { TowerOutputMapper } from '@/towers/application/dto/tower-output';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

describe('UpdateTowerUseCase Unit Tests', () => {
  let sut: UpdateTowerUseCase.UseCase;
  let repository: TowerInMemoryRepository;
  let entity: TowerEntity;

  beforeEach(() => {
    repository = new TowerInMemoryRepository();
    sut = new UpdateTowerUseCase.UseCase(repository);
    entity = new TowerEntity(towerDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const entityMapped = TowerOutputMapper.toOutput(entity);
    await expect(() => sut.execute(entityMapped)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update tower', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new TowerEntity(towerDataBuilder({}))];
    repository.items = items;
    const entityMapped = TowerOutputMapper.toOutput(items[0]);
    const result = await sut.execute({
      ...entityMapped,
      code: 1,
      tower: '100/1',
      coordinates: { latitude: '0000', longitude: '00000' },
    });
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      code: 1,
      tower: '100/1',
      coordinates: { latitude: '0000', longitude: '00000' },
      height: items[0].height,
      weight: items[0].weight,
      type_of_foundation_A: items[0].type_of_foundation_A,
      type_of_foundation_B: items[0].type_of_foundation_B,
      type_of_foundation_C: items[0].type_of_foundation_C,
      type_of_foundation_D: items[0].type_of_foundation_D,
      type_of_foundation_MC: items[0].type_of_foundation_MC,
      embargo: items[0].embargo,
      createdAt: items[0].createdAt,
    });
  });
});
