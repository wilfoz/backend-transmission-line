import { Omit } from '@prisma/client/runtime/library';
import { CreateFoundationDto } from './create-foundation.dto';
import { UpdateFoundationUseCase } from '../../application/usecases/update-foundation.usecase';

export class UpdateFoundationDto
  extends CreateFoundationDto
  implements Omit<UpdateFoundationUseCase.Input, 'id'> { }