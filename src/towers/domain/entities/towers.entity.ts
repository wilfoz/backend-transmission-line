import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CoordinateProps, CoordinatesVO } from './coordinates-vo';
import { TowerValidatorFactory } from '../validators/tower.validator';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { ConflictError } from '../../../shared/domain/errors/conflict-error';

export type Embargo = 'RELEASE' | 'EMBARGOES';
export type TowerProps = {
  code: number;
  tower: string;
  type: string;
  coordinates: CoordinatesVO;
  distance?: number;
  height?: number;
  weight?: number;
  foundations?: string[];
  embargo?: Embargo;
  createdAt?: Date;
};

export type TowerPropsJson = Required<
  { id: string } & Omit<TowerProps, 'coordinates'>
> & { coordinates: CoordinateProps };

export class TowerEntity extends AggregateRoot<TowerProps, TowerPropsJson> {
  constructor(public readonly props: TowerProps, id?: string) {
    TowerEntity.validate(props);
    super(props, id);
    this.props.foundations = props.foundations ?? [];
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get code() {
    return this.props.code;
  }

  private set code(value: number) {
    this.props.code = value;
  }

  get tower() {
    return this.props.tower;
  }

  private set tower(value: string) {
    this.props.tower = value;
  }

  get type() {
    return this.props.type;
  }

  private set type(value: string) {
    this.props.type = value;
  }

  get coordinates() {
    return this.props.coordinates;
  }

  private set coordinates(value: CoordinatesVO) {
    this.props.coordinates = value;
  }

  get distance() {
    return this.props.distance;
  }

  private set distance(value: number) {
    this.props.distance = value;
  }

  get height() {
    return this.props.height;
  }

  private set height(value: number) {
    this.props.height = value;
  }

  get weight() {
    return this.props.weight;
  }

  private set weight(value: number) {
    this.props.weight = value;
  }

  get embargo() {
    return this.props.embargo;
  }

  private set embargo(value: Embargo) {
    this.props.embargo = value;
  }

  get foundations() {
    return this.props.foundations;
  }

  getFoundations(): string[] {
    return [...this.props.foundations];
  }

  // addFoundation(id: string) {
  //   if (this.props.foundations.includes(id)) {
  //     throw new ConflictError('Foundation already exists!');
  //   }
  //   this.props.foundations.push(id);
  // }

  // updateFoundation(id: string, newId: string) {
  //   const index = this.props.foundations.indexOf(id);
  //   if (index === -1) {
  //     throw new Error('Foundation does not exist!');
  //   }
  //   this.props.foundations[index] = newId;
  // }

  get createdAt() {
    return this.props.createdAt;
  }

  update(props: TowerProps): void {
    TowerEntity.validate({ ...this.props });
    this.code = props.code;
    this.tower = props.tower;
    this.type = props.type;
    this.coordinates = props.coordinates;
    this.distance = props.distance;
    this.height = props.height;
    this.weight = props.weight;
    this.embargo = props.embargo;

    this.props.foundations = props.foundations;
  }

  static validate(props: TowerProps) {
    const validator = TowerValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): TowerPropsJson {
    return {
      id: this._id,
      ...this._props,
      coordinates: this._props.coordinates.value,
    } as TowerPropsJson;
  }
}
