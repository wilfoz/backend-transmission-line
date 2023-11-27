import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { EquipmentInMemoryRepository } from '../../equipment-in-memory.repository';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/equipment-data-builder';

describe('EquipmentInMemoryRepository Unit Tests', () => {
  let sut: EquipmentInMemoryRepository;

  beforeEach(() => {
    sut = new EquipmentInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new EquipmentEntity(equipmentDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter model field using filter params', async () => {
    const items = [
      new EquipmentEntity(equipmentDataBuilder({ model: 'A' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'C' })),
      new EquipmentEntity(equipmentDataBuilder({ model: 'B' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'C');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new EquipmentEntity(equipmentDataBuilder({ createdAt })),
      new EquipmentEntity(
        equipmentDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new EquipmentEntity(
        equipmentDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by registration', async () => {
    const items = [
      new EquipmentEntity(equipmentDataBuilder({ registration: '1' })),
      new EquipmentEntity(equipmentDataBuilder({ registration: '3' })),
      new EquipmentEntity(equipmentDataBuilder({ registration: '2' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'registration', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by manufacturer', async () => {
    const items = [
      new EquipmentEntity(equipmentDataBuilder({ manufacturer: 'A' })),
      new EquipmentEntity(equipmentDataBuilder({ manufacturer: 'C' })),
      new EquipmentEntity(equipmentDataBuilder({ manufacturer: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'manufacturer', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });
});
