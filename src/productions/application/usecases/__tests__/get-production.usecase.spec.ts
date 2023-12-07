import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetProductionUseCase } from '../get-production.usecase';
import { ProductionInMemoryRepository } from '../../../infrastructure/database/in-memory/production-in-memory.repository';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';
import { ProductionEntity } from '../../../domain/entities/production.entity';

describe('GetProductionUseCase Unit Tests', () => {
  let sut: GetProductionUseCase.UseCase;
  let repository: ProductionInMemoryRepository;

  beforeEach(() => {
    repository = new ProductionInMemoryRepository();
    sut = new GetProductionUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a production', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new ProductionEntity(productionDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      status: items[0].status,
      comments: items[0].comments,
      startTime: items[0].startTime,
      finalTime: items[0].finalTime,
      teams: items[0].teams,
      towers: items[0].towers,
      taskId: items[0].taskId,
      createdAt: items[0].createdAt,
    });
  });
});
