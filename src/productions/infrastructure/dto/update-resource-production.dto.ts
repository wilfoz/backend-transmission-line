import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { STATUS_PRODUCTION } from '../../domain/entities/production.entity';

export class UpdateResourceProductionDto {
  @IsString()
  id: string;

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
  @IsOptional()
  teams?: string[];

  @IsArray()
  @IsOptional()
  towers?: string[];

  @IsString()
  @IsNotEmpty()
  taskId: string;
}
