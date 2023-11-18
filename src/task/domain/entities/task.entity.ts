import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import AggregateRoot from '@/shared/domain/entities/agregation';
import { TaskValidatorFactory } from '../validators/task.validator';

export type Stage = 'CIVIL' | 'MONTAGEM' | 'LANCAMENTO';

export type TaskProps = {
  code: number;
  stage: Stage;
  group: string;
  name: string;
  unit: string;
  createdAt?: Date;
};

export type TaskPropsJson = Required<{ id: string } & TaskProps>;

export class TaskEntity extends AggregateRoot<TaskProps, TaskPropsJson> {
  constructor(public readonly props: TaskProps, id?: string) {
    TaskEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get code() {
    return this.props.code;
  }

  private set code(value: number) {
    this.props.code = value;
  }

  get stage() {
    return this.props.stage;
  }

  private set stage(value: Stage) {
    this.props.stage = value;
  }

  get group() {
    return this.props.group;
  }

  private set group(value: string) {
    this.props.group = value;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get unit() {
    return this.props.unit;
  }

  private set unit(value: string) {
    this.props.unit = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  update(props: TaskProps): void {
    TaskEntity.validate({ ...this.props });
    this.code = props.code;
    this.stage = props.stage;
    this.group = props.group;
    this.name = props.name;
    this.unit = props.unit;
  }

  static validate(props: TaskProps) {
    const validator = TaskValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON(): TaskPropsJson {
    return {
      id: this._id,
      ...this._props,
    } as TaskPropsJson;
  }
}
