import { TeamProps } from '../entities/team.entity';
import { faker } from '@faker-js/faker';

type Props = {
  name?: string;
  employees?: string[];
  equipments?: string[];
  createdAt?: Date;
};

export function teamDataBuilder(props: Props): TeamProps {
  return {
    name: props.name ?? faker.commerce.department(),
    employees: props.employees ?? [],
    equipments: props.equipments ?? [],
    createdAt: props.createdAt ?? new Date(),
  };
}
