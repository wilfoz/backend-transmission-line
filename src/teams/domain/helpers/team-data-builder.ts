import {
  EmployeesProps,
  EquipmentsProps,
  TeamProps,
} from '../entities/team.entity';
import { faker } from '@faker-js/faker';

type Props = {
  name?: string;
  employees?: EmployeesProps[];
  equipments?: EquipmentsProps[];
  createdAt?: Date;
};

export function teamDataBuilder(props: Props): TeamProps {
  return {
    name: props.name ?? faker.commerce.department(),
    employees: props.employees ?? ([] as any),
    equipments: props.equipments ?? ([] as any),
    createdAt: props.createdAt ?? new Date(),
  };
}
