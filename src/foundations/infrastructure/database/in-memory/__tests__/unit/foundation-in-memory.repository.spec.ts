import { FoundationEntity } from '../../../../../domain/entities/foundation.entity';
import { foundationDataBuilder } from '../../../../../domain/helpers/foundation-data-builder';
import { FoundationInMemoryRepository } from '../../foundation-in-memory.repository';

describe('FoundationInMemoryRepository Unit Tests', () => {
  let sut: FoundationInMemoryRepository;

  beforeEach(() => {
    sut = new FoundationInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new FoundationEntity(foundationDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter model field using filter params', async () => {
    const items = [
      new FoundationEntity(foundationDataBuilder({ description: 'A' })),
      new FoundationEntity(foundationDataBuilder({ description: 'C' })),
      new FoundationEntity(foundationDataBuilder({ description: 'B' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'C');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new FoundationEntity(foundationDataBuilder({ createdAt })),
      new FoundationEntity(
        foundationDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new FoundationEntity(
        foundationDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by project', async () => {
    const items = [
      new FoundationEntity(foundationDataBuilder({ project: 'A' })),
      new FoundationEntity(foundationDataBuilder({ project: 'C' })),
      new FoundationEntity(foundationDataBuilder({ project: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'project', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });

  it('should sort by revision', async () => {
    const items = [
      new FoundationEntity(foundationDataBuilder({ revision: 'A' })),
      new FoundationEntity(foundationDataBuilder({ revision: 'C' })),
      new FoundationEntity(foundationDataBuilder({ revision: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'revision', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });
});
