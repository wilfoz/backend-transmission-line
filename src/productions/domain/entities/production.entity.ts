import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { ConflictError } from '../../../shared/domain/errors/conflict-error';
import { ProductionValidatorFactory } from '../validators/production.validator';

export type STATUS_PRODUCTION = 'EXECUTED' | 'PROGRAMMED' | 'PROGRESS';

export type ProductionProps = {
  status: STATUS_PRODUCTION | string;
  comments: string;
  startTime?: Date;
  finalTime?: Date;
  teams: string[];
  towers: string[];
  taskId: string;
  createdAt?: Date;
};

export type ProductionPropsJson = Required<{ id: string } & ProductionProps>;

export class ProductionEntity extends AggregateRoot<
  ProductionProps,
  ProductionPropsJson
> {
  constructor(public readonly props: ProductionProps, id?: string) {
    ProductionEntity.validate(props);
    super(props, id);
    this.props.startTime = this.props.startTime ?? this.setStartTimeDefault();
    this.props.finalTime = this.props.finalTime ?? this.setFinalTimeDefault();
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get status() {
    return this.props.status;
  }

  private set status(value: STATUS_PRODUCTION | string) {
    this.props.status = value;
  }

  get comments() {
    return this.props.comments;
  }

  private set comments(value: string) {
    this.props.comments = value;
  }

  get taskId() {
    return this.props.taskId;
  }

  private set taskId(value: string) {
    this.props.taskId = value;
  }

  get teams() {
    return this.props.teams;
  }

  private set teams(values: string[]) {
    this.props.teams = values;
  }

  get towers() {
    return this.props.towers;
  }

  private set towers(values: string[]) {
    this.props.towers = values;
  }

  get startTime() {
    return this.props.startTime;
  }

  private set startTime(value: Date) {
    this.props.startTime = value;
  }

  get finalTime() {
    return this.props.finalTime;
  }

  private set finalTime(value: Date) {
    this.props.finalTime = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  setStartTimeDefault(): Date {
    const hour = new Date().setHours(7);
    return new Date(hour);
  }

  setFinalTimeDefault(): Date {
    const hour = new Date().setHours(17);
    return new Date(hour);
  }

  addTeam(id: string) {
    if (this.props.teams.includes(id)) {
      throw new ConflictError('Team already exists!');
    }
    this.props.teams.push(id);
  }

  removeTeam(id: string) {
    const index = this.props.teams.indexOf(id);
    if (index === -1) {
      throw new Error('Team does not exist!');
    }
    //this.props.employees.splice(index, 1);
  }

  addTower(id: string) {
    if (this.props.towers.includes(id)) {
      throw new ConflictError('Tower already exists!');
    }
    this.props.towers.push(id);
  }

  removeTower(id: string) {
    const index = this.props.towers.indexOf(id);
    if (index === -1) {
      throw new Error('Tower does not exist!');
    }
    //this.props.employees.splice(index, 1);
  }

  update(props: ProductionProps): void {
    ProductionEntity.validate({ ...this.props });
    this.status = props.status;
    this.comments = props.comments;
    this.startTime = props.startTime;
    this.finalTime = props.finalTime;
    this.teams = props.teams;
    this.towers = props.towers;
    this.taskId = props.taskId;
  }

  static validate(props: ProductionProps) {
    const validator = ProductionValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): ProductionPropsJson {
    return {
      id: this._id,
      ...this._props,
    } as ProductionPropsJson;
  }
}
