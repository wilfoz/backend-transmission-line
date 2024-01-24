import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { Transform } from 'class-transformer';
import { ListFoundationsUseCase } from '../../application/usecases/list-foundation.usecase';

export class FoundationPresenter {
  id: string;
  project: string;
  revision: string;
  description: string;
  excavation_volume: number;
  concrete_volume: number;
  backfill_volume: number;
  steel_volume: number;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: FoundationPresenter) {
    this.id = output.id;
    this.project = output.project;
    this.revision = output.revision;
    this.description = output.description;
    this.excavation_volume = output.excavation_volume;
    this.concrete_volume = output.concrete_volume;
    this.backfill_volume = output.backfill_volume;
    this.steel_volume = output.steel_volume;
    this.createdAt = output.createdAt;
  }
}

export class FoundationsCollectionPresenter extends CollectionPresenter {
  data: FoundationPresenter[];
  constructor(output: ListFoundationsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new FoundationPresenter(item));
  }
}
