import { taskDataBuilder } from '../../helpers/task-data-builder';
import { TaskEntity, TaskProps } from '../task.entity';

describe('TaskEntity Unit Tests', () => {
  let props: TaskProps;
  let sut: TaskEntity;

  beforeEach(() => {
    TaskEntity.validate = jest.fn();
    props = taskDataBuilder({});
    sut = new TaskEntity(props);
  });

  it('Constructor method', () => {
    expect(TaskEntity.validate).toHaveBeenCalled();
    expect(sut.props.code).toEqual(props.code);
    expect(sut.props.stage).toEqual(props.stage);
    expect(sut.props.group).toEqual(props.group);
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.unit).toEqual(props.unit);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  describe('Getters and Setters', () => {
    it('Getter of code fields', () => {
      expect(sut.code).toBeDefined();
      expect(sut.code).toEqual(props.code);
      expect(typeof sut.code).toBe('number');
    });

    it('Setter of code fields', () => {
      sut['code'] = 1;

      expect(sut.props.code).toEqual(1);
      expect(typeof sut.props.code).toBe('number');
    });

    it('Getter of stage fields', () => {
      expect(sut.stage).toBeDefined();
      expect(sut.stage).toEqual(props.stage);
      expect(typeof sut.stage).toBe('string');
    });

    it('Setter of stage fields', () => {
      sut['stage'] = 'CIVIL';

      expect(sut.props.stage).toEqual('CIVIL');
      expect(typeof sut.props.stage).toBe('string');
    });

    it('Getter of group fields', () => {
      expect(sut.group).toBeDefined();
      expect(sut.group).toEqual(props.group);
      expect(typeof sut.group).toBe('string');
    });

    it('Setter of group fields', () => {
      sut['group'] = props.group;

      expect(sut.props.group).toEqual(props.group);
      expect(typeof sut.props.group).toBe('string');
    });

    it('Getter of name fields', () => {
      expect(sut.name).toBeDefined();
      expect(sut.name).toEqual(props.name);
      expect(typeof sut.name).toBe('string');
    });

    it('Setter of name fields', () => {
      sut['name'] = props.name;

      expect(sut.props.name).toEqual(props.name);
      expect(typeof sut.props.name).toBe('string');
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('updated methods', () => {
    it('should update a task', () => {
      sut.update({
        ...props,
        stage: 'CIVIL',
        group: 'Montagem Estaiada',
        name: 'Transporte de estruturas',
      });
      expect(TaskEntity.validate).toHaveBeenCalled();
      expect(sut.props.stage).toEqual('CIVIL');
      expect(sut.props.group).toEqual('Montagem Estaiada');
      expect(sut.props.name).toEqual('Transporte de estruturas');
    });
  });
});
