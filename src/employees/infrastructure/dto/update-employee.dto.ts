import { Omit } from '@prisma/client/runtime/library';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeUseCase } from '@/employees/application/usecases/update-employee.usecase';

export class UpdateEmployeeDto
  extends CreateEmployeeDto
  implements Omit<UpdateEmployeeUseCase.Input, 'id'> { }