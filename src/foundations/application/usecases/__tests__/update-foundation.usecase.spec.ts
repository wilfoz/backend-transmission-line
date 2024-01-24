import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UpdateFoundationUseCase } from '../update-foundation.usecase';
import { FoundationInMemoryRepository } from '../../../infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../domain/helpers/foundation-data-builder';
import { FoundationOutputMapper } from '../../dto/foundation-output';

describe('UpdateFoundationUseCase Unit Tests', () => {
  let sut: UpdateFoundationUseCase.UseCase;
  let repository: FoundationInMemoryRepository;
  let entity: FoundationEntity;

  beforeEach(() => {
    repository = new FoundationInMemoryRepository();
    sut = new UpdateFoundationUseCase.UseCase(repository);
    entity = new FoundationEntity(foundationDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const entityMapped = FoundationOutputMapper.toOutput(entity);
    await expect(() => sut.execute(entityMapped)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update foundation', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new FoundationEntity(foundationDataBuilder({}))];
    repository.items = items;
    const entityMapped = FoundationOutputMapper.toOutput(items[0]);
    const result = await sut.execute({
      ...entityMapped,
      project: 'AT-FUN-MCA-0001',
      revision: '0A',
      description: 'AT-TCB-AFL-0.5',
      excavation_volume: 20,
      concrete_volume: 15,
      backfill_volume: 18,
      steel_volume: 1000,
    });
    expect(spyUpdate).toHaveBeenCalled();
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
