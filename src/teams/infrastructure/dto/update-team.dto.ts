import { Omit } from '@prisma/client/runtime/library';
import { CreateTeamDto } from './create-team.dto';
import { UpdateTeamUseCase } from '@/teams/application/usecases/update-team.usecase';

export class UpdateTeamDto
  extends CreateTeamDto
  implements Omit<UpdateTeamUseCase.Input, 'id'> { }
