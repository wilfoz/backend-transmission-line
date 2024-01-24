import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetFoundationUseCase } from '../get-foundation.usecase';
import { FoundationInMemoryRepository } from '../../../infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../domain/helpers/foundation-data-builder';

describe('GetFoundationUseCase Unit Tests', () => {
  let sut: GetFoundationUseCase.UseCase;
  let repository: FoundationInMemoryRepository;

  beforeEach(() => {
    repository = new FoundationInMemoryRepository();
    sut = new GetFoundationUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a foundation', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new FoundationEntity(foundationDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      project: items[0].project,
      revision: items[0].revision,
      description: items[0].description,
      excavation_volume: items[0].excavation_volume,
      concrete_volume: items[0].concrete_volume,
      backfill_volume: items[0].backfill_volume,
      steel_volume: items[0].steel_volume,
      createdAt: items[0].createdAt,
    });
  });
});
