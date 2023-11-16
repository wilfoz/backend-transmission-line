import { Omit } from '@prisma/client/runtime/library';
import { UpdateTowerUseCase } from '@/towers/application/usecases/update-tower.usecase';
import { CreateTowerDto } from './create-tower.dto';

export class UpdateTowerDto
  extends CreateTowerDto
  implements Omit<UpdateTowerUseCase.Input, 'id'> { }