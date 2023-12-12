import { employeeDataBuilder } from '../../helpers/employee-data-builder';
import { EmployeeEntity, EmployeeProps } from '../employee.entity';

describe('EmployeeEntity Unit Tests', () => {
  let props: EmployeeProps;
  let sut: EmployeeEntity;

  beforeEach(() => {
    EmployeeEntity.validate = jest.fn();
    props = employeeDataBuilder({});
    sut = new EmployeeEntity(props);
  });

  it('Constructor method', () => {
    expect(EmployeeEntity.validate).toHaveBeenCalled();
    expect(sut.props.registration).toEqual(props.registration);
    expect(sut.props.fullName).toEqual(props.fullName);
    expect(sut.props.occupation).toEqual(props.occupation);
    expect(sut.props.leadership).toEqual(props.leadership);
    expect(sut.props.status).toEqual(props.status);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  describe('Getters and Setters', () => {
    it('Getter of registration fields', () => {
      expect(sut.registration).toBeDefined();
      expect(sut.registration).toEqual(props.registration);
      expect(typeof sut.registration).toBe('string');
    });

    it('Setter of registration fields', () => {
      sut['registration'] = '1';

      expect(sut.props.registration).toEqual('1');
      expect(typeof sut.props.registration).toBe('string');
    });

    it('Getter of fullName fields', () => {
      expect(sut.fullName).toBeDefined();
      expect(sut.fullName).toEqual(props.fullName);
      expect(typeof sut.fullName).toBe('string');
    });

    it('Setter of fullName fields', () => {
      sut['fullName'] = 'test';

      expect(sut.props.fullName).toEqual('test');
      expect(typeof sut.props.fullName).toBe('string');
    });

    it('Getter of occupation fields', () => {
      expect(sut.occupation).toBeDefined();
      expect(sut.occupation).toEqual(props.occupation);
      expect(typeof sut.occupation).toBe('string');
    });

    it('Setter of occupation fields', () => {
      sut['occupation'] = props.occupation;

      expect(sut.props.occupation).toEqual(props.occupation);
      expect(typeof sut.props.occupation).toBe('string');
    });

    it('Getter of status fields', () => {
      expect(sut.status).toBeDefined();
      expect(sut.status).toEqual(props.status);
      expect(typeof sut.status).toBe('string');
    });

    it('Setter of status fields', () => {
      sut['status'] = props.status;

      expect(sut.props.status).toEqual(props.status);
      expect(typeof sut.props.status).toBe('string');
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('updated methods', () => {
    it('should update a employee', () => {
      sut.update({
        ...props,
        fullName: 'Anthony Max',
        leadership: false,
        status: 'ACTIVE',
      });
      expect(EmployeeEntity.validate).toHaveBeenCalled();
      expect(sut.props.fullName).toEqual('Anthony Max');
      expect(sut.props.leadership).toBeFalsy();
      expect(sut.props.status).toEqual('ACTIVE');
    });
  });
});
