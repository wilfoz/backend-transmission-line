import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { EmployeeValidatorFactory } from '../validators/employee.validator';

export type Status = 'ACTIVE' | 'AWAY';

export type EmployeeProps = {
  registration: string;
  fullName: string;
  occupation: string;
  leadership: boolean;
  status: Status;
  teamId?: string;
  createdAt?: Date;
};

export type EmployeePropsJson = Required<{ id: string } & EmployeeProps>;

export class EmployeeEntity extends AggregateRoot<
  EmployeeProps,
  EmployeePropsJson
> {
  constructor(public readonly props: EmployeeProps, id?: string) {
    EmployeeEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get registration() {
    return this.props.registration;
  }

  private set registration(value: string) {
    this.props.registration = value;
  }

  get fullName() {
    return this.props.fullName;
  }

  private set fullName(value: string) {
    this.props.fullName = value;
  }

  get occupation() {
    return this.props.occupation;
  }

  private set occupation(value: string) {
    this.props.occupation = value;
  }

  get leadership() {
    return this.props.leadership;
  }

  private set leadership(value: boolean) {
    this.props.leadership = value;
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

  update(props: EmployeeProps): void {
    EmployeeEntity.validate({ ...this.props });
    this.registration = props.registration;
    this.fullName = props.fullName;
    this.occupation = props.occupation;
    this.leadership = props.leadership;
    this.status = props.status;
  }

  static validate(props: EmployeeProps) {
    const validator = EmployeeValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): EmployeePropsJson {
    return {
      id: this._id,
      ...this._props,
    } as EmployeePropsJson;
  }
}
