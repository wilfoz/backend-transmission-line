import { CreateTowerUseCase } from '@/towers/application/usecases/create-tower.usecase';
import { CoordinateProps } from '@/towers/domain/entities/coordinates-vo';
import { Embargo } from '@/towers/domain/entities/towers.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTowerDto implements CreateTowerUseCase.Input {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  tower: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @IsNotEmpty()
  coordinates: CoordinateProps;

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
  embargo?: Embargo;
}
