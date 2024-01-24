import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { FoundationValidatorFactory } from '../validators/foundation.validator';

export type FoundationProps = {
  project: string;
  revision: string;
  description: string;
  excavation_volume: number;
  concrete_volume: number;
  backfill_volume: number;
  steel_volume: number;
  createdAt?: Date;
};

export type FoundationPropsJson = Required<{ id: string } & FoundationProps>;

export class FoundationEntity extends AggregateRoot<
  FoundationProps,
  FoundationPropsJson
> {
  constructor(public readonly props: FoundationProps, id?: string) {
    FoundationEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get project() {
    return this.props.project;
  }

  private set project(value: string) {
    this.props.project = value;
  }

  get revision() {
    return this.props.revision;
  }

  private set revision(value: string) {
    this.props.revision = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value;
  }

  get excavation_volume() {
    return this.props.excavation_volume;
  }

  private set excavation_volume(value: number) {
    this.props.excavation_volume = value;
  }

  get concrete_volume() {
    return this.props.concrete_volume;
  }

  private set concrete_volume(value: number) {
    this.props.concrete_volume = value;
  }

  get backfill_volume() {
    return this.props.backfill_volume;
  }

  private set backfill_volume(value: number) {
    this.props.backfill_volume = value;
  }

  get steel_volume() {
    return this.props.steel_volume;
  }

  private set steel_volume(value: number) {
    this.props.steel_volume = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  update(props: FoundationProps): void {
    FoundationEntity.validate({ ...this.props });
    this.project = props.project;
    this.revision = props.revision;
    this.description = props.description;
    this.excavation_volume = props.excavation_volume;
    this.concrete_volume = props.concrete_volume;
    this.backfill_volume = props.backfill_volume;
    this.steel_volume = props.steel_volume;
  }

  static validate(props: FoundationProps) {
    const validator = FoundationValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): FoundationPropsJson {
    return {
      id: this._id,
      ...this._props,
    } as FoundationPropsJson;
  }
}
