import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateFoundationUseCase } from '../../application/usecases/create-foundation.usecase';

export class CreateFoundationDto implements CreateFoundationUseCase.Input {
  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  revision: string;

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
}
