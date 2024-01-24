import { TowerInMemoryRepository } from '@/towers/infrastructure/database/in-memory/tower-in-memory.repository';
import { ListTowersUseCase } from '../../list-towers.usecase';
import { TowerRepository } from '@/towers/domain/repositories/tower.repository';
import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { FoundationInMemoryRepository } from '../../../../../foundations/infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../../../foundations/domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../../../foundations/domain/helpers/foundation-data-builder';

describe('ListTowersUseCase Unit Tests', () => {
  let sut: ListTowersUseCase.UseCase;
  let tower_repository: TowerInMemoryRepository;
  let foundation_repository: FoundationInMemoryRepository;

  beforeEach(() => {
    tower_repository = new TowerInMemoryRepository();
    foundation_repository = new FoundationInMemoryRepository();
    sut = new ListTowersUseCase.UseCase(
      tower_repository,
      foundation_repository,
    );
  });

  it('toOutput method', async () => {
    let result = new TowerRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = await sut['toOutput'](result);
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

    output = await sut['toOutput'](result);
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

    tower_repository.items = items;
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
    const foundation = new FoundationEntity(foundationDataBuilder({}));
    await foundation_repository.insert(foundation);

    const items = [
      new TowerEntity(
        towerDataBuilder({ type: 'a', foundations: [foundation.id] }),
      ),
      new TowerEntity(
        towerDataBuilder({ type: 'AA', foundations: [foundation.id] }),
      ),
      new TowerEntity(
        towerDataBuilder({ type: 'Aa', foundations: [foundation.id] }),
      ),
      new TowerEntity(
        towerDataBuilder({ type: 'b', foundations: [foundation.id] }),
      ),
      new TowerEntity(
        towerDataBuilder({ type: 'c', foundations: [foundation.id] }),
      ),
    ];

    tower_repository.items = items;

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'type',
      sortDir: 'asc',
      filter: 'a',
    });

    expect(output).toStrictEqual({
      items: [
        {
          id: items[1].toJSON().id,
          code: items[1].toJSON().code,
          tower: items[1].toJSON().tower,
          type: items[1].toJSON().type,
          coordinates: items[1].toJSON().coordinates,
          distance: items[1].toJSON().distance,
          height: items[1].toJSON().height,
          weight: items[1].toJSON().weight,
          foundations: output.items[0].foundations,
          embargo: items[1].toJSON().embargo,
          createdAt: items[1].toJSON().createdAt,
        },
        {
          id: items[2].toJSON().id,
          code: items[2].toJSON().code,
          tower: items[2].toJSON().tower,
          type: items[2].toJSON().type,
          coordinates: items[2].toJSON().coordinates,
          distance: items[2].toJSON().distance,
          height: items[2].toJSON().height,
          weight: items[2].toJSON().weight,
          foundations: output.items[1].foundations,
          embargo: items[2].toJSON().embargo,
          createdAt: items[2].toJSON().createdAt,
        },
      ],
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
      items: [
        {
          id: items[0].toJSON().id,
          code: items[0].toJSON().code,
          tower: items[0].toJSON().tower,
          type: items[0].toJSON().type,
          coordinates: items[0].toJSON().coordinates,
          distance: items[0].toJSON().distance,
          height: items[0].toJSON().height,
          weight: items[0].toJSON().weight,
          foundations: output.items[0].foundations,
          embargo: items[0].toJSON().embargo,
          createdAt: items[0].toJSON().createdAt,
        },
      ],
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
      items: [
        {
          id: items[0].toJSON().id,
          code: items[0].toJSON().code,
          tower: items[0].toJSON().tower,
          type: items[0].toJSON().type,
          coordinates: items[0].toJSON().coordinates,
          distance: items[0].toJSON().distance,
          height: items[0].toJSON().height,
          weight: items[0].toJSON().weight,
          foundations: output.items[0].foundations,
          embargo: items[0].toJSON().embargo,
          createdAt: items[0].toJSON().createdAt,
        },
        {
          id: items[2].toJSON().id,
          code: items[2].toJSON().code,
          tower: items[2].toJSON().tower,
          type: items[2].toJSON().type,
          coordinates: items[2].toJSON().coordinates,
          distance: items[2].toJSON().distance,
          height: items[2].toJSON().height,
          weight: items[2].toJSON().weight,
          foundations: output.items[2].foundations,
          embargo: items[2].toJSON().embargo,
          createdAt: items[2].toJSON().createdAt,
        },
        {
          id: items[1].toJSON().id,
          code: items[1].toJSON().code,
          tower: items[1].toJSON().tower,
          type: items[1].toJSON().type,
          coordinates: items[1].toJSON().coordinates,
          distance: items[1].toJSON().distance,
          height: items[1].toJSON().height,
          weight: items[1].toJSON().weight,
          foundations: output.items[1].foundations,
          embargo: items[1].toJSON().embargo,
          createdAt: items[1].toJSON().createdAt,
        },
      ],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    });
  });
});
