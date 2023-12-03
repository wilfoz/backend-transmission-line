import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateResourceTeamDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  employees?: string[];

  @IsOptional()
  equipments?: string[];
}
