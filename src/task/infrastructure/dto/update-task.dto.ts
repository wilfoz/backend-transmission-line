import { Omit } from '@prisma/client/runtime/library';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskUseCase } from '@/task/application/usecases/update-task.usecase';

export class UpdateTaskDto
  extends CreateTaskDto
  implements Omit<UpdateTaskUseCase.Input, 'id'> { }
