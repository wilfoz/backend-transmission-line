import { Stage, TaskEntity } from '@/task/domain/entities/task.entity';

export type TaskOutput = {
  id: string;
  code: number;
  stage: Stage;
  group: string;
  name: string;
  unit: string;
  createdAt: Date;
};

export class TaskOutputMapper {
  static toOutput(entity: TaskEntity): TaskOutput {
    return entity.toJSON();
  }
}
