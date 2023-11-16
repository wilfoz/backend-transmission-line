import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteTowerUseCase } from '../../delete-tower.usecase';
import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';

describe('DeleteTowerUseCase Unit Tests', () => {
  let sut: DeleteTowerUseCase.UseCase;
  let repository: TowerInMemoryRepository;

  beforeEach(() => {
    repository = new TowerInMemoryRepository();
    sut = new DeleteTowerUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a tower', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new TowerEntity(towerDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
