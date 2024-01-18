import {
  IsArray,
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
  embargo?: string;

  @IsArray()
  @IsOptional()
  foundations?: string[];

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
    foundations,
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
      foundations,
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
