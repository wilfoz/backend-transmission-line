import { ValidationError } from '@/shared/domain/errors/validation-error';
import { TeamEntity } from '@/teams/domain/entities/team.entity';
import { Team, Employee, Equipment } from '@prisma/client';

export class TeamModelMapper {
  static toEntity(
    model: Required<
      {
        employees: Employee[];
        equipments: Equipment[];
      } & Team
    >,
  ) {
    const data = {
      name: model.name,
      createdAt: model.createdAt,
      employees: model.employees,
      equipments: model.equipments,
    };

    try {
      return new TeamEntity(data, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
