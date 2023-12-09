import { ProductionEntity } from '../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';
import { ProductionRepository } from '../../../domain/repositories/production.repository';
import { ProductionInMemoryRepository } from '../../../infrastructure/database/in-memory/production-in-memory.repository';
import { ListProductionsUseCase } from '../list-production.usecase';

describe('ListProductionsUseCase Unit Tests', () => {
  let sut: ListProductionsUseCase.UseCase;
  let repository: ProductionInMemoryRepository;

  beforeEach(() => {
    repository = new ProductionInMemoryRepository();
    sut = new ListProductionsUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new ProductionRepository.SearchResult({
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
    const entity = new ProductionEntity(productionDataBuilder({}));
    result = new ProductionRepository.SearchResult({
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

  it('should return the production sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new ProductionEntity(productionDataBuilder({ createdAt })),
      new ProductionEntity(
        productionDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new ProductionEntity(
        productionDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
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

  it('should return the production pagination, sorted and filter', async () => {
    const items = [
      new ProductionEntity(productionDataBuilder({ comments: 'test' })),
      new ProductionEntity(productionDataBuilder({ comments: 'TEST' })),
      new ProductionEntity(productionDataBuilder({ comments: 'fake' })),
      new ProductionEntity(productionDataBuilder({ comments: 'Test' })),
      new ProductionEntity(productionDataBuilder({ comments: 'FAKE' })),
      new ProductionEntity(productionDataBuilder({ comments: 'FaKe' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'comments',
      sortDir: 'asc',
      filter: 'test',
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[3].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'comments',
      sortDir: 'asc',
      filter: 'test',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });
  });
});
