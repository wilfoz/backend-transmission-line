import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteFoundationUseCase } from '../delete-foundation.usecase';
import { FoundationInMemoryRepository } from '../../../infrastructure/database/in-memory/foundation-in-memory.repository';
import { FoundationEntity } from '../../../domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../domain/helpers/foundation-data-builder';

describe('DeleteEmployeeUseCase Unit Tests', () => {
  let sut: DeleteFoundationUseCase.UseCase;
  let repository: FoundationInMemoryRepository;

  beforeEach(() => {
    repository = new FoundationInMemoryRepository();
    sut = new DeleteFoundationUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a Foundation', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new FoundationEntity(foundationDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
