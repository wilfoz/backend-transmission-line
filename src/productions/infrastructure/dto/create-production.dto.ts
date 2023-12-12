import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateProductionUseCase } from '../../application/usecases/create-production.usecase';
import { STATUS_PRODUCTION } from '../../domain/entities/production.entity';
import { Type } from 'class-transformer';

export class CreateProductionDto implements CreateProductionUseCase.Input {
  @IsString()
  @IsNotEmpty()
  status: STATUS_PRODUCTION;

  @IsString()
  @IsNotEmpty()
  comments: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @Type(() => Date)
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
}
