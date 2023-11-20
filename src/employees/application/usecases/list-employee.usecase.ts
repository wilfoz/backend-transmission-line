import { UseCase as DefaultUseCase } from '@/shared/application/providers/usecases/use-case';
import { SearchInput } from '@/shared/application/dto/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import { EmployeeOutput, EmployeeOutputMapper } from '../dto/employee-output';
import { EmployeeRepository } from '@/employees/domain/repositories/employee.repository';

export namespace ListEmployeesUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<EmployeeOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: EmployeeRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const params = new EmployeeRepository.SearchParams(input);
      const searchResult = await this.repository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: EmployeeRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return EmployeeOutputMapper.toOutput(item);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
