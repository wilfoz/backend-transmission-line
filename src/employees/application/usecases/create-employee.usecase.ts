import {
  EmployeeEntity,
  Status,
} from '@/employees/domain/entities/employee.entity';
import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { EmployeeOutput, EmployeeOutputMapper } from '../dto/employee-output';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';

export namespace CreateEmployeeUseCase {
  export type Input = {
    registration: string;
    fullName: string;
    occupation: string;
    leadership: boolean;
    status: Status;
  };

  export type Output = EmployeeOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EmployeeRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      try {
        const entity = new EmployeeEntity(input);
        await this.repository.insert(entity);
        return EmployeeOutputMapper.toOutput(entity);
      } catch (e) {
        this.handleError(e);
      }
    }

    private handleError(e: Error) {
      if (e instanceof EntityValidationError) {
        throw new EntityValidationError(e.error);
      }
      throw e;
    }
  }
}
