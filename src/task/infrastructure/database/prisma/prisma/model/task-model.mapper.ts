import { ValidationError } from '@/shared/domain/errors/validation-error';
import { TaskEntity } from '@/task/domain/entities/task.entity';
import { Task } from '@prisma/client';
type Stage = 'CIVIL' | 'MONTAGEM' | 'LANCAMENTO';
export class TaskModelMapper {
  static toEntity(model: Task) {
    const data = {
      code: model.code,
      stage: model.stage,
      group: model.group,
      name: model.name,
      unit: model.unit,
      createdAt: model.createdAt,
    };

    try {
      return new TaskEntity({ ...data, stage: data.stage as Stage }, model.id);
    } catch (error) {
      throw new ValidationError('An entity not be loaded');
    }
  }
}
