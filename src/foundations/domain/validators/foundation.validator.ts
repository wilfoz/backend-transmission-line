import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { FoundationProps } from '../entities/foundation.entity';

export class FoundationRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  project: string;

  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  revision: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  excavation_volume: number;

  @IsNumber()
  @IsNotEmpty()
  concrete_volume: number;

  @IsNumber()
  @IsNotEmpty()
  backfill_volume: number;

  @IsNumber()
  @IsNotEmpty()
  steel_volume: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    project,
    revision,
    description,
    excavation_volume,
    concrete_volume,
    backfill_volume,
    steel_volume,
    createdAt,
  }: FoundationRules) {
    Object.assign(this, {
      project,
      revision,
      description,
      excavation_volume,
      concrete_volume,
      backfill_volume,
      steel_volume,
      createdAt,
    });
  }
}

export class FoundationValidator extends ClassValidatorFields<FoundationRules> {
  validate(data: FoundationProps): boolean {
    return super.validate(new FoundationRules(data ?? ({} as FoundationProps)));
  }
}

export class FoundationValidatorFactory {
  static create(): FoundationValidator {
    return new FoundationValidator();
  }
}
