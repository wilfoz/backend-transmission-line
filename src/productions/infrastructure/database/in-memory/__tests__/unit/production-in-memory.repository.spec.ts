import { ProductionEntity } from '../../../../../domain/entities/production.entity';
import { productionDataBuilder } from '../../../../../domain/helpers/production-data-builder';
import { ProductionInMemoryRepository } from '../../production-in-memory.repository';

describe('ProductionInMemoryRepository Unit Tests', () => {
  let sut: ProductionInMemoryRepository;

  beforeEach(() => {
    sut = new ProductionInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new ProductionEntity(productionDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter model field using filter params', async () => {
    const items = [
      new ProductionEntity(productionDataBuilder({ status: 'EXECUTED' })),
      new ProductionEntity(productionDataBuilder({ status: 'PROGRAMMED' })),
      new ProductionEntity(productionDataBuilder({ status: 'PROGRESS' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'PROGRAMMED');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new ProductionEntity(productionDataBuilder({ createdAt })),
      new ProductionEntity(
        productionDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new ProductionEntity(
        productionDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by status', async () => {
    const items = [
      new ProductionEntity(productionDataBuilder({ status: 'EXECUTED' })),
      new ProductionEntity(productionDataBuilder({ status: 'PROGRESS' })),
      new ProductionEntity(productionDataBuilder({ status: 'PROGRAMMED' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'status', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
