import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { DeleteEquipmentUseCase } from '../delete-equipment.usecase';
import { EquipmentInMemoryRepository } from '@/equipments/infrastructure/database/in-memory/equipment-in-memory.repository';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/Equipment-data-builder';

describe('DeleteEquipmentUseCase Unit Tests', () => {
  let sut: DeleteEquipmentUseCase.UseCase;
  let repository: EquipmentInMemoryRepository;

  beforeEach(() => {
    repository = new EquipmentInMemoryRepository();
    sut = new DeleteEquipmentUseCase.UseCase(repository);
  });

  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a Equipment', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new EquipmentEntity(equipmentDataBuilder({}))];
    repository.items = items;

    await sut.execute({ id: items[0].id });
    expect(spyDelete).toHaveBeenCalled();
    expect(repository.items).toHaveLength(0);
  });
});
