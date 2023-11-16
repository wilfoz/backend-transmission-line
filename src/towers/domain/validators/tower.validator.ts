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
import { TowerProps } from '../entities/towers.entity';
import { CoordinatesVO } from '../entities/coordinates-vo';

export class TowerRules {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  tower: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInstance(CoordinatesVO)
  @IsOptional()
  coordinates?: CoordinatesVO;

  @IsNumber()
  @IsOptional()
  distance?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsString()
  @IsOptional()
  type_of_foundation_A?: string;

  @IsString()
  @IsOptional()
  type_of_foundation_B?: string;

  @IsString()
  @IsOptional()
  type_of_foundation_C?: string;

  @IsString()
  @IsOptional()
  type_of_foundation_D?: string;

  @IsString()
  @IsOptional()
  type_of_foundation_MC?: string;

  @IsString()
  @IsOptional()
  embargo?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    code,
    tower,
    type,
    coordinates,
    distance,
    height,
    weight,
    type_of_foundation_A,
    type_of_foundation_B,
    type_of_foundation_C,
    type_of_foundation_D,
    type_of_foundation_MC,
    embargo,
    createdAt,
  }: TowerProps) {
    Object.assign(this, {
      code,
      tower,
      type,
      coordinates,
      distance,
      height,
      weight,
      type_of_foundation_A,
      type_of_foundation_B,
      type_of_foundation_C,
      type_of_foundation_D,
      type_of_foundation_MC,
      embargo,
      createdAt,
    });
  }
}

export class TowerValidator extends ClassValidatorFields<TowerRules> {
  validate(data: TowerProps): boolean {
    return super.validate(new TowerRules(data ?? ({} as TowerProps)));
  }
}

export class TowerValidatorFactory {
  static create(): TowerValidator {
    return new TowerValidator();
  }
}
