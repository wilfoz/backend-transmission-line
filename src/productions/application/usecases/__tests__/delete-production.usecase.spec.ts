import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteProductionUseCase } from '../delete-production.usecase';
import { ProductionInMemoryRepository } from '../../../infrastructure/database/in-memory/production-in-memory.repository';
import { ProductionEntity } from '../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';

describe('DeleteProductionUseCase Unit Tests', () => {
  let sut: DeleteProductionUseCase.UseCase;
  let repository: ProductionInMemoryRepository;

  beforeEach(() => {
    repository = new ProductionInMemoryRepository();
    sut = new DeleteProductionUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a production', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new ProductionEntity(productionDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
