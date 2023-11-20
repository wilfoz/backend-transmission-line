import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';

export namespace DeleteEmployeeUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EmployeeRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      await this.repository.delete(input.id);
    }
  }
}
