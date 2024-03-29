import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import {
  TowerFoundationOutput,
  TowerOutput,
} from '@/towers/application/dto/tower-output';
import { ListTowersUseCase } from '@/towers/application/usecases/list-towers.usecase';
import { CoordinateProps } from '@/towers/domain/entities/coordinates-vo';
import { Embargo } from '@/towers/domain/entities/towers.entity';
import { Transform, Type } from 'class-transformer';

export class TowerFoundationPresenter {
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

  constructor(output: TowerFoundationOutput) {
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

  //@Type(() => TowerFoundationPresenter)
  foundations: TowerFoundationPresenter[];

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
    this.foundations = output.foundations.map(item => {
      return new TowerFoundationPresenter(item);
    });
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
