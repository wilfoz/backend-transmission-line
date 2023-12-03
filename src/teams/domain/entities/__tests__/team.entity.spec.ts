import { teamDataBuilder } from '../../helpers/team-data-builder';
import { TeamEntity, TeamProps } from '../team.entity';

describe('TeamEntity Unit Tests', () => {
  let props: TeamProps;
  let sut: TeamEntity;

  beforeEach(() => {
    TeamEntity.validate = jest.fn();
    props = teamDataBuilder({});
    sut = new TeamEntity(props);
  });

  it('Constructor method', () => {
    expect(TeamEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.employees).toEqual(props.employees);
    expect(sut.props.equipments).toEqual(props.equipments);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  describe('Getters and Setters', () => {
    it('Getter of name fields', () => {
      expect(sut.name).toBeDefined();
      expect(sut.name).toEqual(props.name);
      expect(typeof sut.name).toBe('string');
    });

    it('Setter of name fields', () => {
      sut['name'] = 'Locação';

      expect(sut.props.name).toEqual('Locação');
      expect(typeof sut.props.name).toBe('string');
    });

    it('Getter of employees fields', () => {
      expect(sut.getEmployees().length).toBe(0);
      expect(sut.getEmployees()).toEqual(props.employees);
    });

    it('Getter of equipments fields', () => {
      expect(sut.getEquipments().length).toBe(0);
      expect(sut.getEquipments()).toEqual(props.equipments);
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('TeamEntity methods', () => {
    it('should update a name', () => {
      sut.update('Sondagem');
      expect(TeamEntity.validate).toHaveBeenCalled();
      expect(sut.props.name).toEqual('Sondagem');
    });

    describe('Employees methods', () => {
      it('should throw an error when add an exited employee', () => {
        const employeeId = '9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a';
        sut.addEmployee(employeeId);
        expect(() => sut.addEmployee(employeeId)).toThrowError(
          'Employee already exists!',
        );
      });

      it('should add a employee', () => {
        sut.addEmployee('9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a');
        expect(sut.props.employees.length).toBe(1);
      });

      it('should not remove a non-existing employee', () => {
        expect(() => sut.removeEmployee('fake-id')).toThrowError(
          'Employee does not exist!',
        );
      });

      // it('should remove a employee', () => {
      //   const idEmployee = '9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a';
      //   sut.addEmployee(idEmployee);
      //   sut.removeEmployee(idEmployee);
      //   expect(sut.props.employees.length).toBe(0);
      // });
    });
    describe('Equipments methods', () => {
      it('should throw an error when add an exited equipment', () => {
        const equipmentId = '9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a';
        sut.addEquipment(equipmentId);
        expect(() => sut.addEquipment(equipmentId)).toThrowError(
          'Equipment already exists!',
        );
      });

      it('should add a equipment', () => {
        sut.addEquipment('9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a');
        expect(sut.props.equipments.length).toBe(1);
      });

      it('should not remove a non-existing equipment', () => {
        expect(() => sut.removeEquipment('fake-id')).toThrowError(
          'Equipment does not exist!',
        );
      });

      // it('should remove a equipment', () => {
      //   const idEquipment = '9f2bfd31-0e31-41a0-be7d-6c5bd213fc7a';
      //   sut.addEquipment(idEquipment);
      //   sut.removeEquipment(idEquipment);
      //   expect(sut.props.equipments.length).toBe(0);
      // });
    });
  });
});
