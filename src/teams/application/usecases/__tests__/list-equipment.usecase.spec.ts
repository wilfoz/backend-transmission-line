import { EquipmentInMemoryRepository } from '@/equipments/infrastructure/database/in-memory/equipment-in-memory.repository';
import { ListEquipmentsUseCase } from '../list-equipment.usecase';
import { EquipmentRepository } from '@/equipments/domain/repositories/equipment.repository';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/Equipment-data-builder';

describe('ListEquipmentsUseCase Unit Tests', () => {
  let sut: ListEquipmentsUseCase.UseCase;
  let repository: EquipmentInMemoryRepository;

  beforeEach(() => {
    repository = new EquipmentInMemoryRepository();
    sut = new ListEquipmentsUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new EquipmentRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
    const entity = new EquipmentEntity(equipmentDataBuilder({}));
    result = new EquipmentRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });

  it('should return the equipment sorted by createAt', async () => {
    const createdAt = new Date();
    const items = [
      new EquipmentEntity(equipmentDataBuilder({ createdAt })),
      new EquipmentEntity(
        equipmentDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
      new EquipmentEntity(
        equipmentDataBuilder({ createdAt: new Date(createdAt.getTime() + 2) }),
      ),
    ];

    repository.items = items;
    const output = await sut.execute({});
    expect(output).toStrictEqual({
      items: [...items].map(item => item.toJSON()),
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    });
  });

  it('should return the equipments pagination, sorted and filter', async () => {
    const items = [
      new EquipmentEntity(equipmentDataBuilder({ model: 'test' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'TEST' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'fake' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'Test' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'FAKE' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'FaKe' })),
    ];

    repository.items = items;
    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'model',
      sortDir: 'asc',
      filter: 'test',
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[3].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'model',
      sortDir: 'asc',
      filter: 'test',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });
  });
});
