import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { RemoveTeamToProductionUseCase } from '../remove-team-production.usecase';
import { ProductionInMemoryRepository } from '../../../infrastructure/database/in-memory/production-in-memory.repository';
import { ProductionEntity } from '../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../domain/helpers/production-data-builder';

describe('RemoveTeamToProductionUseCase Unit Tests', () => {
  let sut: RemoveTeamToProductionUseCase.UseCase;
  let repository: ProductionInMemoryRepository;
  let entity: ProductionEntity;

  beforeEach(() => {
    repository = new ProductionInMemoryRepository();
    sut = new RemoveTeamToProductionUseCase.UseCase(repository);
    entity = new ProductionEntity(productionDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const input = {
      id: entity.id,
      status: entity.status,
      comments: entity.comments,
      startTime: entity.startTime,
      finalTime: entity.finalTime,
      teams: entity.teams,
      towers: entity.towers,
      taskId: entity.taskId,
      teamId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };
    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should trows error team not found', async () => {
    const items = [new ProductionEntity(productionDataBuilder({}))];
    const input = {
      id: items[0].id,
      status: items[0].status,
      comments: items[0].comments,
      startTime: items[0].startTime,
      finalTime: items[0].finalTime,
      teams: items[0].teams,
      towers: items[0].towers,
      taskId: items[0].taskId,
      teamId: '96010fff-fc27-406c-bba0-44182c7b67a0',
    };

    repository.items = items;

    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Team does not exist!'),
    );
  });
});
