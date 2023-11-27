import { EmployeeEntity } from '@/employees/domain/entities/employee.entity';
import { teamDataBuilder } from '../../helpers/team-data-builder';
import { TeamEntity, TeamProps } from '../team.entity';
import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';
import { EquipmentEntity } from '@/equipments/domain/entities/equipments.entity';
import { equipmentDataBuilder } from '@/equipments/domain/helpers/Equipment-data-builder';

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
      expect(sut.employees.size).toBe(1);
      expect(sut.employees).toEqual(props.employees);
    });

    it('Setter of employees fields', () => {
      const employee = new EmployeeEntity(employeeDataBuilder({}));
      const mapped = new Map<string, EmployeeEntity>([
        [employee._id, employee],
      ]);
      sut['employees'] = mapped;
      expect(sut.employees).toEqual(mapped);
    });

    it('Getter of equipments fields', () => {
      expect(sut.equipments.size).toBe(1);
      expect(sut.equipments).toEqual(props.equipments);
    });

    it('Setter of equipments fields', () => {
      const equipment = new EquipmentEntity(equipmentDataBuilder({}));
      const mapped = new Map<string, EquipmentEntity>([
        [equipment._id, equipment],
      ]);
      sut['equipments'] = mapped;
      expect(sut.equipments).toEqual(mapped);
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
    it('should add employee', () => {
      const employee = new EmployeeEntity(employeeDataBuilder({}));
      sut.addEmployee(employee);
      expect(sut.props.employees.size).toBe(2);
      expect(sut.props.employees).toBeInstanceOf(Map);
    });
    it('should update employees', () => {
      const employee = new EmployeeEntity(
        employeeDataBuilder({ fullName: 'Miguel' }),
      );
      sut.updateEmployees([employee]);
      const updatedEmployee = sut.props.employees.get(employee._id);
      expect(updatedEmployee.fullName).toEqual(employee.fullName);
      expect(sut.props.employees).toBeInstanceOf(Map);
      expect(sut.props.employees.size).toBe(1);
    });
    it('should remove employee', () => {
      const employee = new EmployeeEntity(employeeDataBuilder({}));
      sut.removeEmployee(employee);
      expect(sut.props.employees.size).toBe(1);
      expect(sut.props.employees).toBeInstanceOf(Map);
    });
    it('should add equipment', () => {
      const equipment = new EquipmentEntity(equipmentDataBuilder({}));
      sut.addEquipment(equipment);
      expect(sut.props.equipments.size).toBe(2);
      expect(sut.props.equipments.get(equipment.id)).toEqual(equipment);
      expect(sut.props.equipments).toBeInstanceOf(Map);
    });

    it('should update equipments', () => {
      const equipment = new EquipmentEntity(
        equipmentDataBuilder({ model: 'Fiat' }),
      );
      sut.updateEquipments([equipment]);
      const updatedEquipment = sut.props.equipments.get(equipment._id);
      expect(updatedEquipment.model).toEqual(equipment.model);
      expect(sut.props.equipments).toBeInstanceOf(Map);
      expect(sut.props.equipments.size).toBe(1);
    });

    it('should remove equipment', () => {
      const equipment = new EquipmentEntity(equipmentDataBuilder({}));
      sut.removeEquipment(equipment);
      expect(sut.props.equipments.size).toBe(1);
      expect(sut.props.equipments).toBeInstanceOf(Map);
    });
  });
});
