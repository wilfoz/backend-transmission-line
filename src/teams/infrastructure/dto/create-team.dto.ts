import { CreateTeamUseCase } from '@/teams/application/usecases/create-team.usecase';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto implements CreateTeamUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  employees?: string[];

  @IsOptional()
  equipments?: string[];
}
