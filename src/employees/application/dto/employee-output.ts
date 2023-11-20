import {
  EmployeeEntity,
  Status,
} from '@/employees/domain/entities/employee.entity';

export type EmployeeOutput = {
  id: string;
  registration: string;
  fullName: string;
  occupation: string;
  leadership: boolean;
  status: Status;
  createdAt: Date;
};

export class EmployeeOutputMapper {
  static toOutput(entity: EmployeeEntity): EmployeeOutput {
    return entity.toJSON();
  }
}
