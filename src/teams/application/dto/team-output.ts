import {
  EmployeesProps,
  EquipmentsProps,
  TeamEntity,
} from '@/teams/domain/entities/team.entity';

export type TeamOutput = {
  id: string;
  name: string;
  employees?: EmployeesProps[];
  equipments?: EquipmentsProps[];
  createdAt: Date;
};

export class TeamOutputMapper {
  static toOutput(entity: TeamEntity): TeamOutput {
    return entity.toJSON();
  }
}
