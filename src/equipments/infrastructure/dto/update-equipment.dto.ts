import { Omit } from '@prisma/client/runtime/library';
import { CreateEquipmentDto } from './create-equipment.dto';
import { UpdateEquipmentUseCase } from '@/equipments/application/usecases/update-equipment.usecase';

export class UpdateEquipmentDto
  extends CreateEquipmentDto
  implements Omit<UpdateEquipmentUseCase.Input, 'id'> { }
