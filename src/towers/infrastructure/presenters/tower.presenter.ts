import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { TowerOutput } from '@/towers/application/dto/tower-output';
import { ListTowersUseCase } from '@/towers/application/usecases/list-towers.usecase';
import { CoordinateProps } from '@/towers/domain/entities/coordinates-vo';
import { Embargo } from '@/towers/domain/entities/towers.entity';
import { Transform } from 'class-transformer';

export class TowerPresenter {
  id: string;
  code: number;
  tower: string;
  type: string;
  coordinates: CoordinateProps;
  distance: number | null;
  height: number | null;
  weight: number | null;
  embargo: Embargo | null;
  foundations: string[];

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: TowerOutput) {
    this.id = output.id;
    this.code = output.code;
    this.tower = output.tower;
    this.type = output.type;
    this.coordinates = output.coordinates;
    this.distance = output.distance;
    this.height = output.height;
    this.weight = output.weight;
    this.foundations = output.foundations;
    this.embargo = output.embargo;
    this.createdAt = output.createdAt;
  }
}

export class TowersCollectionPresenter extends CollectionPresenter {
  data: TowerPresenter[];
  constructor(output: ListTowersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new TowerPresenter(item));
  }
}
