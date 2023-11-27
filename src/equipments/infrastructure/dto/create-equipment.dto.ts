import { CreateEquipmentUseCase } from '@/equipments/application/usecases/create-equipment.usecase';
import { Status } from '@/equipments/domain/entities/equipments.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEquipmentDto implements CreateEquipmentUseCase.Input {
  @IsString()
  @IsNotEmpty()
  registration: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  status: Status;
}
