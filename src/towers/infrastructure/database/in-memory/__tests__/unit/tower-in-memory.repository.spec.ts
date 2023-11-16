import { TowerEntity } from '@/towers/domain/entities/towers.entity';
import { TowerInMemoryRepository } from '../../tower-in-memory.repository';
import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';

describe('TowerInMemoryRepository Unit Tests', () => {
  let sut: TowerInMemoryRepository;

  beforeEach(() => {
    sut = new TowerInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new TowerEntity(towerDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter code field using filter params', async () => {
    const items = [
      new TowerEntity(towerDataBuilder({ type: 'AT' })),
      new TowerEntity(towerDataBuilder({ type: 'EL' })),
      new TowerEntity(towerDataBuilder({ type: 'el' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'E');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[1], items[2]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new TowerEntity(towerDataBuilder({ createdAt })),
      new TowerEntity(
        towerDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new TowerEntity(
        towerDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by type', async () => {
    const items = [
      new TowerEntity(towerDataBuilder({ type: 'A' })),
      new TowerEntity(towerDataBuilder({ type: 'C' })),
      new TowerEntity(towerDataBuilder({ type: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'type', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by code', async () => {
    const items = [
      new TowerEntity(towerDataBuilder({ code: 1 })),
      new TowerEntity(towerDataBuilder({ code: 3 })),
      new TowerEntity(towerDataBuilder({ code: 2 })),
    ];
    const itemsSorted = await sut['applySort'](items, 'code', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by tower', async () => {
    const items = [
      new TowerEntity(towerDataBuilder({ tower: '101/1' })),
      new TowerEntity(towerDataBuilder({ tower: '101/3' })),
      new TowerEntity(towerDataBuilder({ tower: '101/2' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'tower', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });
});
