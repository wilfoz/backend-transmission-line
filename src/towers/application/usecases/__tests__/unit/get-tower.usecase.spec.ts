import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { GetTowerUseCase } from '../../get-tower.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';

describe('GetTowerUseCase Unit Tests', () => {
  let sut: GetTowerUseCase.UseCase;
  let repository: TowerInMemoryRepository;

  beforeEach(() => {
    repository = new TowerInMemoryRepository();
    sut = new GetTowerUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a tower', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new TowerEntity(towerDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      code: items[0].code,
      tower: items[0].tower,
      coordinates: items[0].coordinates.value,
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
