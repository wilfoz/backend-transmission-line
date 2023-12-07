import { Omit } from '@prisma/client/runtime/library';
import { UpdateProductionUseCase } from '../../application/usecases/update-production.usecase';
import { CreateProductionDto } from './create-production.dto';

export class UpdateProductionDto
  extends CreateProductionDto
  implements Omit<UpdateProductionUseCase.Input, 'id'> { }
