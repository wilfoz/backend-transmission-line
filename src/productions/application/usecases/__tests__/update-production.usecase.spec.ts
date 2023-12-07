import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UpdateProductionUseCase } from '../update-production.usecase';
import { ProductionInMemoryRepository } from '../../../infrastructure/database/in-memory/production-in-memory.repository';
import { ProductionEntity } from '../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';

describe('UpdateProductionUseCase Unit Tests', () => {
  let sut: UpdateProductionUseCase.UseCase;
  let repository: ProductionInMemoryRepository;
  let entity: ProductionEntity;

  beforeEach(() => {
    repository = new ProductionInMemoryRepository();
    sut = new UpdateProductionUseCase.UseCase(repository);
    entity = new ProductionEntity(productionDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update production', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new ProductionEntity(productionDataBuilder({}))];
    repository.items = items;
    const dateTimeDefault = new Date();

    const updated = {
      id: items[0].id,
      status: 'PROGRAMMED',
      comments: 'some comments',
      startTime: dateTimeDefault,
      finalTime: dateTimeDefault,
      teams: ['192f2c30-cf4c-4202-9843-7c519f0ab8fa'],
      towers: ['11c1d262-4048-4c91-8777-6574224497e1'],
      taskId: '12c0cc4b-c92d-4ca3-8b50-20fcf6b6e754',
    };

    const result = await sut.execute(updated);
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      status: 'PROGRAMMED',
      comments: 'some comments',
      startTime: items[0].startTime,
      finalTime: items[0].finalTime,
      teams: ['192f2c30-cf4c-4202-9843-7c519f0ab8fa'],
      towers: ['11c1d262-4048-4c91-8777-6574224497e1'],
      taskId: '12c0cc4b-c92d-4ca3-8b50-20fcf6b6e754',
    });
  });
});
