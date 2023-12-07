import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateProductionUseCase } from '../../application/usecases/create-production.usecase';
import { STATUS_PRODUCTION } from '../../domain/entities/production.entity';

export class CreateProductionDto implements CreateProductionUseCase.Input {
  @IsString()
  @IsNotEmpty()
  status: STATUS_PRODUCTION;

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
  @IsNotEmpty()
  teams: string[];

  @IsArray()
  @IsNotEmpty()
  towers: string[];

  @IsString()
  @IsNotEmpty()
  taskId: string;
}
