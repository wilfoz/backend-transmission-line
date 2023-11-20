import { CreateEmployeeUseCase } from '@/employees/application/usecases/create-employee.usecase';
import { Status } from '@/employees/domain/entities/employee.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto implements CreateEmployeeUseCase.Input {
  @IsString()
  @IsNotEmpty()
  registration: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsBoolean()
  @IsNotEmpty()
  leadership: boolean;

  @IsString()
  @IsNotEmpty()
  status: Status;
}
