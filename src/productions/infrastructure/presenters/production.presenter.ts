import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { Transform } from 'class-transformer';
import { ListProductionsUseCase } from '../../application/usecases/list-production.usecase';

export type STATUS_PRODUCTION = 'EXECUTED' | 'PROGRAMMED' | 'PROGRESS';

export class ProductionPresenter {
  id: string;
  status: STATUS_PRODUCTION | string;
  comments: string;
  startTime?: Date;
  finalTime?: Date;
  teams?: string[];
  towers?: string[];
  taskId: string;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: ProductionPresenter) {
    this.id = output.id;
    this.status = output.status;
    this.comments = output.comments;
    this.startTime = output.startTime;
    this.finalTime = output.finalTime;
    this.teams = output.teams;
    this.towers = output.towers;
    this.taskId = output.taskId;
    this.createdAt = output.createdAt;
  }
}

export class ProductionCollectionPresenter extends CollectionPresenter {
  data: ProductionPresenter[];
  constructor(output: ListProductionsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new ProductionPresenter(item));
  }
}
