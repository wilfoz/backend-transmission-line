import { TeamProps } from '../entities/team.entity';
import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/Equipment-data-builder';

type Props = {
  name?: string;
  employees?: Map<string, EmployeeEntity>;
  equipments?: Map<string, EquipmentEntity>;
  createdAt?: Date;
};

export function teamDataBuilder(props: Props): TeamProps {
  const employee = new EmployeeEntity(employeeDataBuilder({}));
  const equipment = new EquipmentEntity(equipmentDataBuilder({}));
  return {
    name: props.name ?? 'Equipe de topográfia',
    employees:
      props.employees ??
      new Map<string, EmployeeEntity>([[employee.id, employee]]),
    equipments:
      props.equipments ??
      new Map<string, EquipmentEntity>([[equipment.id, equipment]]),
    createdAt: props.createdAt ?? new Date(),
  };
}
