import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { TeamValidatorFactory } from '../validators/team.validator';
import { ConflictError } from '../../../shared/domain/errors/conflict-error';

export type TeamProps = {
  name: string;
  employees?: string[];
  equipments?: string[];
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

  getEmployees(): string[] {
    return [...this.props.employees];
  }

  addEmployee(id: string) {
    if (this.props.employees.includes(id)) {
      throw new ConflictError('Employee already exists!');
    }
    this.props.employees.push(id);
  }

  removeEmployee(id: string) {
    const index = this.props.employees.indexOf(id);
    if (index === -1) {
      throw new Error('Employee does not exist!');
    }
    //this.props.employees.splice(index, 1);
  }

  getEquipments(): string[] {
    return [...this.props.equipments];
  }

  addEquipment(id: string) {
    if (this.props.equipments.includes(id)) {
      throw new ConflictError('Equipment already exists!');
    }
    this.props.equipments.push(id);
  }

  removeEquipment(id: string) {
    const index = this.props.equipments.indexOf(id);
    if (index === -1) {
      throw new Error('Equipment does not exist!');
    }
    //this.props.equipments.splice(index, 1);
  }

  update(name: string): void {
    const updatedProps = { ...this.props, name };
    TeamEntity.validate(updatedProps);
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
      employees: this.getEmployees(),
      equipments: this.getEquipments(),
      createdAt: this.props.createdAt,
    } as TeamPropsJson;
  }
}
