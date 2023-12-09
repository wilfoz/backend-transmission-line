import {
  IsArray,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import {
  ProductionProps,
  STATUS_PRODUCTION,
} from '../entities/production.entity';

const status = ['EXECUTED', 'PROGRAMMED', 'PROGRESS'];
export class ProductionRules {
  @IsString()
  @IsNotEmpty()
  @IsIn(status)
  status: STATUS_PRODUCTION | string;

  @IsString()
  @IsNotEmpty()
  comments: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  finalTime?: Date;

  @IsArray()
  @IsOptional()
  teams?: string[];

  @IsArray()
  @IsOptional()
  towers?: string[];

  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    status,
    comments,
    startTime,
    finalTime,
    teams,
    towers,
    taskId,
    createdAt,
  }: ProductionRules) {
    Object.assign(this, {
      towers,
      comments,
      startTime,
      finalTime,
      teams,
      status,
      taskId,
      createdAt,
    });
  }
}

export class ProductionValidator extends ClassValidatorFields<ProductionRules> {
  validate(data: ProductionProps): boolean {
    return super.validate(new ProductionRules(data ?? ({} as ProductionProps)));
  }
}

export class ProductionValidatorFactory {
  static create(): ProductionValidator {
    return new ProductionValidator();
  }
}
