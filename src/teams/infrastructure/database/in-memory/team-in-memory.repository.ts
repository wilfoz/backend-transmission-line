import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable-repository';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { TeamRepository } from '@/teams/domain/repositories/team.repository';
import { NotFoundError } from '../../../../shared/domain/errors/not-found-error';
import { ConflictError } from '../../../../shared/domain/errors/conflict-error';

export class TeamInMemoryRepository
  extends InMemorySearchableRepository<TeamEntity>
  implements TeamRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt'];

  protected async applyFilter(
    items: TeamEntity[],
    filter: TeamRepository.Filter,
  ): Promise<TeamEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: TeamEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<TeamEntity[]> {
    return !sort
      ? super.applySort(items, 'createAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }

  async addEmployeeId(team: TeamEntity, employeeId: string): Promise<void> {
    await this.updateEntityId(team, 'employees', employeeId);
  }

  async removeEmployeeId(team: TeamEntity, employeeId: string): Promise<void> {
    await this.removeEntityId(team, 'employees', employeeId);
  }

  async addEquipmentId(team: TeamEntity, equipmentId: string): Promise<void> {
    await this.updateEntityId(team, 'equipments', equipmentId);
  }

  async removeEquipmentId(
    team: TeamEntity,
    equipmentId: string,
  ): Promise<void> {
    await this.removeEntityId(team, 'equipments', equipmentId);
  }

  private async updateEntityId(
    team: TeamEntity,
    key: 'employees' | 'equipments',
    id: string,
  ): Promise<void> {
    const index = await this.getIndex(team);
    const entityExists = this.items[index][key].includes(id);

    if (entityExists) {
      throw new ConflictError(`ID ${id} already exists`);
    }
    this.items[index][key].push(id);
  }

  private async removeEntityId(
    team: TeamEntity,
    key: 'employees' | 'equipments',
    id: string,
  ): Promise<void> {
    const index = await this.getIndex(team);
    const entityIndex = this.items[index][key].indexOf(id);

    if (entityIndex === -1) {
      throw new NotFoundError(`ID ${id} not found`);
    }

    this.items[index][key].splice(entityIndex, 1);
  }

  private async getIndex(team: TeamEntity): Promise<number> {
    const index = this.items.findIndex(item => item.name === team.name);

    if (index === -1) {
      throw new NotFoundError('Team not found');
    }

    return index;
  }
}
