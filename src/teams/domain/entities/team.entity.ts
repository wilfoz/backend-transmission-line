import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { EquipmentProps } from '@/equipments/domain/entities/equipments.entity';
import { EmployeeProps } from '@/employees/domain/entities/employee.entity';
import { TeamValidatorFactory } from '../validators/team.validator';

export type EmployeesProps = Required<{ id: string } & EmployeeProps>;
export type EquipmentsProps = Required<{ id: string } & EquipmentProps>;

export type TeamProps = {
  name: string;
  employees?: EmployeesProps[];
  equipments?: EquipmentsProps[];
  createdAt?: Date;
};

export type TeamPropsJson = Required<{ id: string } & TeamProps>;

export class TeamEntity extends AggregateRoot<TeamProps, TeamPropsJson> {
  constructor(public readonly props: TeamProps, id?: string) {
    TeamEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.employees = this.props.employees ?? [];
    this.props.equipments = this.props.equipments ?? [];
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get employees() {
    return this.props.employees;
  }

  get equipments() {
    return this.props.equipments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  update(name: string): void {
    TeamEntity.validate({
      ...this.props,
      name,
    });
    this.name = name;
  }

  static validate(props: TeamProps) {
    const validator = TeamValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): TeamPropsJson {
    return {
      id: this._id,
      name: this.name,
      employees: this.employees,
      equipments: this.equipments,
      createdAt: this.props.createdAt,
    } as TeamPropsJson;
  }
}
