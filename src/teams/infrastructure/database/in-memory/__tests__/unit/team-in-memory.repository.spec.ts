import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { TeamInMemoryRepository } from '../../team-in-memory.repository';
import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import { ConflictError } from '../../../../../../shared/domain/errors/conflict-error';
import { NotFoundError } from '../../../../../../shared/domain/errors/not-found-error';

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

  // describe('Team employees methods', () => {
  //   it('should throw an ConflictError', async () => {
  //     const items = [
  //       new TeamEntity(
  //         teamDataBuilder({
  //           employees: ['9f869d0f-14a7-4b06-aedf-24e92b05fe6c'],
  //         }),
  //       ),
  //       new TeamEntity(teamDataBuilder({})),
  //       new TeamEntity(teamDataBuilder({})),
  //     ];

  //     sut.items = items;
  //     await expect(() =>
  //       sut.addEmployeeId(items[0], '9f869d0f-14a7-4b06-aedf-24e92b05fe6c'),
  //     ).rejects.toThrow(
  //       new ConflictError(
  //         'ID 9f869d0f-14a7-4b06-aedf-24e92b05fe6c already exists',
  //       ),
  //     );
  //   });

  //   it('should throw an NotFoundError', async () => {
  //     const items = [
  //       new TeamEntity(teamDataBuilder({})),
  //       new TeamEntity(teamDataBuilder({})),
  //       new TeamEntity(teamDataBuilder({})),
  //     ];

  //     sut.items = items;
  //     await expect(() =>
  //       sut.removeEmployeeId(items[0], '9f869d0f-14a7-4b06-aedf-24e92b05fe6c'),
  //     ).rejects.toThrow(
  //       new NotFoundError('ID 9f869d0f-14a7-4b06-aedf-24e92b05fe6c not found'),
  //     );
  //   });

  //   it('should add employee', async () => {
  //     const items = [
  //       new TeamEntity(teamDataBuilder({})),
  //       new TeamEntity(teamDataBuilder({})),
  //       new TeamEntity(teamDataBuilder({})),
  //     ];
  //     sut.items = items;

  //     await sut.addEmployeeId(items[0], '9f869d0f-14a7-4b06-aedf-24e92b05fe6c');

  //     expect(sut.items[0]).toBeInstanceOf(TeamEntity);
  //     expect(sut.items[0].employees.length).toBe(1);
  //     expect(sut.items[0].employees[0]).toBe(
  //       '9f869d0f-14a7-4b06-aedf-24e92b05fe6c',
  //     );
  //   });

  //   it('should remove equipment', async () => {
  //     const items = [
  //       new TeamEntity(
  //         teamDataBuilder({
  //           equipments: ['9f869d0f-14a7-4b06-aedf-24e92b05fe6c'],
  //         }),
  //       ),
  //       new TeamEntity(teamDataBuilder({})),
  //       new TeamEntity(teamDataBuilder({})),
  //     ];

  //     sut.items = items;
  //     await sut.removeEquipmentId(
  //       items[0],
  //       '9f869d0f-14a7-4b06-aedf-24e92b05fe6c',
  //     );

  //     expect(sut.items[0].equipments.length).toBe(0);
  //     expect(sut.items[0]).toBeInstanceOf(TeamEntity);
  //   });
  // });
});
