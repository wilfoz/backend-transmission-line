import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { TowerOutput } from '@/towers/application/dto/tower-output';
import { ListTowersUseCase } from '@/towers/application/usecases/list-towers.usecase';
import { CoordinateProps } from '@/towers/domain/entities/coordinates-vo';
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
  type_of_foundation_A: string | null;
  type_of_foundation_B: string | null;
  type_of_foundation_C: string | null;
  type_of_foundation_D: string | null;
  type_of_foundation_MC: string | null;
  embargo: string | null;

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
    this.type_of_foundation_A = output.type_of_foundation_A;
    this.type_of_foundation_B = output.type_of_foundation_B;
    this.type_of_foundation_C = output.type_of_foundation_C;
    this.type_of_foundation_D = output.type_of_foundation_D;
    this.type_of_foundation_MC = output.type_of_foundation_MC;
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
