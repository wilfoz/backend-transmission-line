import { faker } from '@faker-js/faker';
import { EmployeeProps, Status } from '../entities/employee.entity';

type Props = {
  registration?: string;
  fullName?: string;
  occupation?: string;
  leadership?: boolean;
  status?: Status;
  teamId?: string | null;
  createdAt?: Date;
};

export function employeeDataBuilder(props: Props): EmployeeProps {
  return {
    registration: props.registration ?? faker.string.alphanumeric(5),
    fullName: props.fullName ?? faker.person.fullName(),
    occupation: props.occupation ?? faker.person.jobTitle(),
    leadership: props.leadership ?? true,
    status: props.status ?? 'ACTIVE',
    teamId: null,
    createdAt: props.createdAt ?? new Date(),
  };
}
