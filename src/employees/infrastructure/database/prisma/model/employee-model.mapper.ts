import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Employee } from '@prisma/client';

type Status = 'ACTIVE' | 'AWAY';

export class EmployeeModelMapper {
  static toEntity(model: Employee) {
    const data = {
      registration: model.registration,
      fullName: model.fullName,
      occupation: model.occupation,
      leadership: model.leadership,
      status: model.status,
      createdAt: model.createdAt,
    };

    try {
      const transformedData = {
        ...data,
        status: data.status as Status,
      };
      return new EmployeeEntity(transformedData, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
