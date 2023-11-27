import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { GetEquipmentUseCase } from '../get-equipment.usecase';
import { EquipmentInMemoryRepository } from '@/equipments/infrastructure/database/in-memory/equipment-in-memory.repository';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/Equipment-data-builder';

describe('GetEquipmentUseCase Unit Tests', () => {
  let sut: GetEquipmentUseCase.UseCase;
  let repository: EquipmentInMemoryRepository;

  beforeEach(() => {
    repository = new EquipmentInMemoryRepository();
    sut = new GetEquipmentUseCase.UseCase(repository);
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should returns a equipment', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new EquipmentEntity(equipmentDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      registration: items[0].registration,
      model: items[0].model,
      manufacturer: items[0].manufacturer,
      licensePlate: items[0].licensePlate,
      provider: items[0].provider,
      status: items[0].status,
      createdAt: items[0].createdAt,
    });
  });
});
