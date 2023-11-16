import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { CoordinateProps, CoordinatesVO } from './coordinates-vo';
import { TowerValidatorFactory } from '../validators/tower.validator';
import AggregateRoot from '@/shared/domain/entities/agregation';

export type Embargo = 'RELEASE' | 'EMBARGOES';
export type TowerProps = {
  code: number;
  tower: string;
  type: string;
  coordinates: CoordinatesVO;
  distance?: number;
  height?: number;
  weight?: number;
  type_of_foundation_A?: string;
  type_of_foundation_B?: string;
  type_of_foundation_C?: string;
  type_of_foundation_D?: string;
  type_of_foundation_MC?: string;
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
    this.props.createdAt = this.props.createdAt ?? new Date();
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

  get type_of_foundation_A() {
    return this.props.type_of_foundation_A;
  }

  private set type_of_foundation_A(value: string) {
    this.props.type_of_foundation_A = value;
  }

  get type_of_foundation_B() {
    return this.props.type_of_foundation_B;
  }

  private set type_of_foundation_B(value: string) {
    this.props.type_of_foundation_B = value;
  }

  get type_of_foundation_C() {
    return this.props.type_of_foundation_C;
  }

  private set type_of_foundation_C(value: string) {
    this.props.type_of_foundation_C = value;
  }

  get type_of_foundation_D() {
    return this.props.type_of_foundation_D;
  }

  private set type_of_foundation_D(value: string) {
    this.props.type_of_foundation_D = value;
  }

  get type_of_foundation_MC() {
    return this.props.type_of_foundation_MC;
  }

  private set type_of_foundation_MC(value: string) {
    this.props.type_of_foundation_MC = value;
  }

  get embargo() {
    return this.props.embargo;
  }

  private set embargo(value: Embargo) {
    this.props.embargo = value;
  }

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
    this.type_of_foundation_A = props.type_of_foundation_A;
    this.type_of_foundation_B = props.type_of_foundation_B;
    this.type_of_foundation_C = props.type_of_foundation_C;
    this.type_of_foundation_D = props.type_of_foundation_D;
    this.type_of_foundation_MC = props.type_of_foundation_MC;
    this.embargo = props.embargo;
  }

  updateTower(value: string): void {
    TowerEntity.validate({ ...this.props, tower: value });
    this.tower = value;
  }

  updateType(value: string): void {
    TowerEntity.validate({ ...this.props, type: value });
    this.type = value;
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
