import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { TaskOutput } from '@/task/application/dto/task-output';
import { ListTasksUseCase } from '@/task/application/usecases/list-task.usecase';
import { Stage } from '@/task/domain/entities/task.entity';
import { Transform } from 'class-transformer';

export class TaskPresenter {
  id: string;
  code: number;
  stage: Stage;
  group: string;
  name: string;
  unit: string;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: TaskOutput) {
    this.id = output.id;
    this.code = output.code;
    this.stage = output.stage;
    this.group = output.group;
    this.name = output.name;
    this.unit = output.unit;
    this.createdAt = output.createdAt;
  }
}

export class TasksCollectionPresenter extends CollectionPresenter {
  data: TaskPresenter[];
  constructor(output: ListTasksUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new TaskPresenter(item));
  }
}
