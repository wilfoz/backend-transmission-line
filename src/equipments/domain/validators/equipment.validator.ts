import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { EquipmentProps, Status } from '../entities/equipments.entity';

export class EquipmentRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  registration: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  model: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  provider: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  status: Status;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    registration,
    model,
    manufacturer,
    licensePlate,
    provider,
    status,
    createdAt,
  }: EquipmentRules) {
    Object.assign(this, {
      registration,
      model,
      manufacturer,
      licensePlate,
      provider,
      status,
      createdAt,
    });
  }
}

export class EquipmentValidator extends ClassValidatorFields<EquipmentRules> {
  validate(data: EquipmentProps): boolean {
    return super.validate(new EquipmentRules(data ?? ({} as EquipmentProps)));
  }
}

export class EquipmentValidatorFactory {
  static create(): EquipmentValidator {
    return new EquipmentValidator();
  }
}
