import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UpdateEquipmentUseCase } from '../update-equipment.usecase';
import { EquipmentInMemoryRepository } from '@/equipments/infrastructure/database/in-memory/equipment-in-memory.repository';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/Equipment-data-builder';
import { EquipmentOutputMapper } from '../../dto/equipments-output';

describe('UpdateEquipmentUseCase Unit Tests', () => {
  let sut: UpdateEquipmentUseCase.UseCase;
  let repository: EquipmentInMemoryRepository;
  let entity: EquipmentEntity;

  beforeEach(() => {
    repository = new EquipmentInMemoryRepository();
    sut = new UpdateEquipmentUseCase.UseCase(repository);
    entity = new EquipmentEntity(equipmentDataBuilder({}));
    jest.restoreAllMocks();
  });
  it('Should trows error entity not found', async () => {
    const entityMapped = EquipmentOutputMapper.toOutput(entity);
    await expect(() => sut.execute(entityMapped)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update equipment', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new EquipmentEntity(equipmentDataBuilder({}))];
    repository.items = items;
    const entityMapped = EquipmentOutputMapper.toOutput(items[0]);
    const result = await sut.execute({
      ...entityMapped,
      registration: '1',
      model: 'Fiat 47',
      manufacturer: 'Ajudante',
      licensePlate: 'AAA:2133',
      status: 'ACTIVE',
    });
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: items[0].id,
      registration: items[0].registration,
      model: items[0].model,
      manufacturer: items[0].manufacturer,
      licensePlate: items[0].licensePlate,
      status: items[0].status,
      createdAt: items[0].createdAt,
    });
  });
});
