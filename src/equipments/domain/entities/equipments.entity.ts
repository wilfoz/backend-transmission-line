import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { EquipmentValidatorFactory } from '../validators/equipment.validator';

export type Status = 'ACTIVE' | 'MAINTENANCE' | 'DEMOBILIZED';

export type EquipmentProps = {
  registration: string;
  model: string;
  manufacturer: string;
  licensePlate: string;
  provider: string;
  status: Status;
  teamId?: string;
  createdAt?: Date;
};

export type EquipmentPropsJson = Required<{ id: string } & EquipmentProps>;

export class EquipmentEntity extends AggregateRoot<
  EquipmentProps,
  EquipmentPropsJson
> {
  constructor(public readonly props: EquipmentProps, id?: string) {
    EquipmentEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get registration() {
    return this.props.registration;
  }

  private set registration(value: string) {
    this.props.registration = value;
  }

  get model() {
    return this.props.model;
  }

  private set model(value: string) {
    this.props.model = value;
  }

  get manufacturer() {
    return this.props.manufacturer;
  }

  private set manufacturer(value: string) {
    this.props.manufacturer = value;
  }

  get licensePlate() {
    return this.props.licensePlate;
  }

  private set licensePlate(value: string) {
    this.props.licensePlate = value;
  }

  get provider() {
    return this.props.provider;
  }

  private set provider(value: string) {
    this.props.provider = value;
  }

  get status() {
    return this.props.status;
  }

  private set status(value: Status) {
    this.props.status = value;
  }

  get teamId() {
    return this.props.teamId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  update(props: EquipmentProps): void {
    EquipmentEntity.validate({ ...this.props });
    this.registration = props.registration;
    this.model = props.model;
    this.manufacturer = props.manufacturer;
    this.licensePlate = props.licensePlate;
    this.provider = props.provider;
    this.status = props.status;
  }

  static validate(props: EquipmentProps) {
    const validator = EquipmentValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): EquipmentPropsJson {
    return {
      id: this._id,
      ...this._props,
    } as EquipmentPropsJson;
  }
}
