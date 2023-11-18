import {
  IsDate,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { TaskProps } from '../entities/task.entity';

export class TaskRules {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  stage: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  group: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ code, stage, group, name, unit, createdAt }: TaskProps) {
    Object.assign(this, {
      code,
      stage,
      group,
      name,
      unit,
      createdAt,
    });
  }
}

export class TaskValidator extends ClassValidatorFields<TaskRules> {
  validate(data: TaskProps): boolean {
    return super.validate(new TaskRules(data ?? ({} as TaskProps)));
  }
}

export class TaskValidatorFactory {
  static create(): TaskValidator {
    return new TaskValidator();
  }
}
