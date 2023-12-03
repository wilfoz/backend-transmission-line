import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { TeamInMemoryRepository } from '../../team-in-memory.repository';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';

describe('TeamInMemoryRepository Unit Tests', () => {
  let sut: TeamInMemoryRepository;

  beforeEach(() => {
    sut = new TeamInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const entity = new TeamEntity(teamDataBuilder({}));
    sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('should filter model field using filter params', async () => {
    const items = [
      new TeamEntity(teamDataBuilder({ name: 'A' })),
      new TeamEntity(teamDataBuilder({ name: 'C' })),
      new TeamEntity(teamDataBuilder({ name: 'B' })),
    ];
    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'C');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it('should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new TeamEntity(teamDataBuilder({ createdAt })),
      new TeamEntity(
        teamDataBuilder({
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new TeamEntity(
        teamDataBuilder({
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];
    const itemsSorted = await sut['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('should sort by name', async () => {
    const items = [
      new TeamEntity(teamDataBuilder({ name: 'A' })),
      new TeamEntity(teamDataBuilder({ name: 'C' })),
      new TeamEntity(teamDataBuilder({ name: 'B' })),
    ];
    const itemsSorted = await sut['applySort'](items, 'name', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
  });
});
