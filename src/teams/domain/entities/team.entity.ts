import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { EquipmentProps } from '@/equipments/domain/entities/equipments.entity';
import { EmployeeProps } from '@/employees/domain/entities/employee.entity';
import { TeamValidatorFactory } from '../validators/team.validator';

export type Equipment = Required<{ id: string } & EquipmentProps>;
export type Employee = Required<{ id: string } & EmployeeProps>;

export type TeamProps = {
  name: string;
  employees?: Map<string, Employee>;
  equipments?: Map<string, Equipment>;
  createdAt?: Date;
};

export type TeamPropsJson = Required<
  { id: string } & Omit<TeamProps, 'employees' | 'equipments'> & {
    employees: EmployeeProps[];
    equipments: EquipmentProps[];
  }
>;

export class TeamEntity extends AggregateRoot<TeamProps, TeamPropsJson> {
  constructor(public readonly props: TeamProps, id?: string) {
    TeamEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
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

  private set employees(value: Map<string, Employee>) {
    this.props.employees = value;
  }

  get equipments() {
    return this.props.equipments;
  }

  private set equipments(value: Map<string, Equipment>) {
    this.props.equipments = value;
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

  addEmployee(value: Employee) {
    this.props.employees.set(value.id, value);
  }

  removeEmployee(value: Employee) {
    const employeeExists = this.props.employees.has(value.id);
    if (employeeExists) {
      this.props.employees.delete(value.id);
    }
  }

  updateEmployees(NewEmployees: Employee[]): void {
    if (!NewEmployees.length) {
      return;
    }
    const employees = new Map<string, Employee>();
    NewEmployees.forEach(employee => {
      employees.set(employee.id, employee);
    });
    TeamEntity.validate({
      ...this.props,
      employees: employees,
    });
    this.props.employees = employees;
  }

  addEquipment(value: Equipment) {
    this.props.equipments.set(value.id, value);
  }

  removeEquipment(value: Equipment) {
    const equipmentExists = this.props.equipments.has(value.id);
    if (equipmentExists) {
      this.props.equipments.delete(value.id);
    }
  }

  updateEquipments(NewEquipments: Equipment[]): void {
    if (!NewEquipments.length) {
      return;
    }
    const equipments = new Map<string, Equipment>();
    NewEquipments.forEach(equipment => {
      equipments.set(equipment.id, equipment);
    });
    TeamEntity.validate({
      ...this.props,
      equipments: equipments,
    });
    this.props.equipments = equipments;
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
      employees: Array.from(this.props.employees.values()).map(employee => {
        return { ...employee };
      }),
      equipments: Array.from(this.props.equipments.values()).map(equipment => {
        return { ...equipment };
      }),
      createdAt: this.props.createdAt,
    } as TeamPropsJson;
  }
}
