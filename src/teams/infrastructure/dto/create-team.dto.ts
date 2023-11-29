import { CreateTeamUseCase } from '@/teams/application/usecases/create-team.usecase';
import {
  EmployeesProps,
  EquipmentsProps,
} from '@/teams/domain/entities/team.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto implements CreateTeamUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  employees?: EmployeesProps[];

  @IsOptional()
  equipments?: EquipmentsProps[];
}
