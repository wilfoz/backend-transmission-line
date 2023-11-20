import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { EmployeeProps, Status } from '../entities/employee.entity';

export class EmployeeRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  registration: number;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsBoolean()
  @IsNotEmpty()
  leadership: string;

  @IsString()
  @IsNotEmpty()
  status: Status;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    registration,
    fullName,
    occupation,
    leadership,
    status,
    createdAt,
  }: EmployeeProps) {
    Object.assign(this, {
      registration,
      fullName,
      occupation,
      leadership,
      status,
      createdAt,
    });
  }
}

export class EmployeeValidator extends ClassValidatorFields<EmployeeRules> {
  validate(data: EmployeeProps): boolean {
    return super.validate(new EmployeeRules(data ?? ({} as EmployeeProps)));
  }
}

export class EmployeeValidatorFactory {
  static create(): EmployeeValidator {
    return new EmployeeValidator();
  }
}
