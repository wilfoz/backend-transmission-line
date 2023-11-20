import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { EmployeeOutput, EmployeeOutputMapper } from '../dto/employee-output';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';

export namespace GetEmployeeUseCase {
  export type Input = {
    id: string;
  };

  export type Output = EmployeeOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EmployeeRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return EmployeeOutputMapper.toOutput(entity);
    }
  }
}
