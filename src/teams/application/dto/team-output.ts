import { EmployeeProps } from '@/employees/domain/entities/employee.entity';
import { EquipmentProps } from '@/equipments/domain/entities/equipments.entity';
import { TeamEntity } from '@/teams/domain/entities/team.entity';

export type TeamOutput = {
  id: string;
  name: string;
  employees?: EmployeeProps[];
  equipments?: EquipmentProps[];
  createdAt?: Date;
};

export class TeamOutputMapper {
  static toOutput(entity: TeamEntity): TeamOutput {
    return entity.toJSON();
  }
}
