import { ListEmployeesUseCase } from '@/employees/application/usecases/list-employee.usecase';
import { Status } from '@/employees/domain/entities/employee.entity';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { Transform } from 'class-transformer';

export class EmployeePresenter {
  id: string;
  registration: string;
  fullName: string;
  occupation: string;
  leadership: boolean;
  status: Status;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: EmployeePresenter) {
    this.id = output.id;
    this.registration = output.registration;
    this.fullName = output.fullName;
    this.occupation = output.occupation;
    this.leadership = output.leadership;
    this.status = output.status;
    this.createdAt = output.createdAt;
  }
}

export class EmployeesCollectionPresenter extends CollectionPresenter {
  data: EmployeePresenter[];
  constructor(output: ListEmployeesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new EmployeePresenter(item));
  }
}
