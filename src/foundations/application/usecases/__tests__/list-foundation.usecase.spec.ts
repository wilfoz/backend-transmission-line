import { FoundationEntity } from '../../../domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../domain/helpers/foundation-data-builder';
import { FoundationRepository } from '../../../domain/repositories/foundation.repository';
import { FoundationInMemoryRepository } from '../../../infrastructure/database/in-memory/foundation-in-memory.repository';
import { ListFoundationsUseCase } from '../list-foundation.usecase';

describe('ListFoundationsUseCase Unit Tests', () => {
  let sut: ListFoundationsUseCase.UseCase;
  let repository: FoundationInMemoryRepository;

  beforeEach(() => {
    repository = new FoundationInMemoryRepository();
    sut = new ListFoundationsUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new FoundationRepository.SearchResult({
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
    const entity = new FoundationEntity(foundationDataBuilder({}));
    result = new FoundationRepository.SearchResult({
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

  it('should return the foundation sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new FoundationEntity(foundationDataBuilder({ createdAt })),
      new FoundationEntity(
        foundationDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new FoundationEntity(
        foundationDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
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

  it('should return the employees pagination, sorted and filter', async () => {
    const items = [
      new FoundationEntity(foundationDataBuilder({ description: 'test' })),
      new FoundationEntity(foundationDataBuilder({ description: 'TEST' })),
      new FoundationEntity(foundationDataBuilder({ description: 'fake' })),
      new FoundationEntity(foundationDataBuilder({ description: 'Test' })),
      new FoundationEntity(foundationDataBuilder({ description: 'FAKE' })),
      new FoundationEntity(foundationDataBuilder({ description: 'FaKe' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'description',
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
      sort: 'description',
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
