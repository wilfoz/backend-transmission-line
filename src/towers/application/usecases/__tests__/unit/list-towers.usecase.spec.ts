import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { ListTowersUseCase } from '../../list-towers.usecase';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';

describe('ListTowersUseCase Unit Tests', () => {
  let sut: ListTowersUseCase.UseCase;
  let repository: TowerInMemoryRepository;

  beforeEach(() => {
    repository = new TowerInMemoryRepository();
    sut = new ListTowersUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new TowerRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
    const entity = new TowerEntity(towerDataBuilder({}));
    result = new TowerRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });

  it('should return the tower sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new TowerEntity(towerDataBuilder({ createdAt })),
      new TowerEntity(
        towerDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new TowerEntity(
        towerDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
      ),
    ];

    repository.items = items;
    const output = await sut.execute({});
    expect(output).toStrictEqual({
      items: [...items].map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    });
  });

  it('should return the towers pagination, sorted and filter', async () => {
    const items = [
      new TowerEntity(towerDataBuilder({ type: 'a' })),
      new TowerEntity(towerDataBuilder({ type: 'AA' })),
      new TowerEntity(towerDataBuilder({ type: 'Aa' })),
      new TowerEntity(towerDataBuilder({ type: 'b' })),
      new TowerEntity(towerDataBuilder({ type: 'c' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'type',
      sortDir: 'asc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'type',
      sortDir: 'asc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'type',
      sortDir: 'desc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    });
  });
});
