import { Status } from '@/employees/domain/entities/employee.entity';
import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { EmployeeOutput, EmployeeOutputMapper } from '../dto/employee-output';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';

export namespace UpdateEmployeeUseCase {
  export type Input = {
    id: string;
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
      const entity = await this.repository.findById(input.id);
      entity.update(input);
      this.repository.update(entity);
      return EmployeeOutputMapper.toOutput(entity);
    }
  }
}
