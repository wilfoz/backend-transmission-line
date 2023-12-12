import { equipmentDataBuilder } from '../../helpers/equipment-data-builder';
import { EquipmentEntity, EquipmentProps } from '../equipments.entity';
describe('EquipmentEntity Unit Tests', () => {
  let props: EquipmentProps;
  let sut: EquipmentEntity;

  beforeEach(() => {
    EquipmentEntity.validate = jest.fn();
    props = equipmentDataBuilder({});
    sut = new EquipmentEntity(props);
  });

  it('Constructor method', () => {
    expect(EquipmentEntity.validate).toHaveBeenCalled();
    expect(sut.props.registration).toEqual(props.registration);
    expect(sut.props.model).toEqual(props.model);
    expect(sut.props.manufacturer).toEqual(props.manufacturer);
    expect(sut.props.licensePlate).toEqual(props.licensePlate);
    expect(sut.props.provider).toEqual(props.provider);
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

    it('Getter of model fields', () => {
      expect(sut.model).toBeDefined();
      expect(sut.model).toEqual(props.model);
      expect(typeof sut.model).toBe('string');
    });

    it('Setter of model fields', () => {
      sut['model'] = 'test';

      expect(sut.props.model).toEqual('test');
      expect(typeof sut.props.model).toBe('string');
    });

    it('Getter of manufacturer fields', () => {
      expect(sut.manufacturer).toBeDefined();
      expect(sut.manufacturer).toEqual(props.manufacturer);
      expect(typeof sut.manufacturer).toBe('string');
    });

    it('Setter of manufacturer fields', () => {
      sut['manufacturer'] = props.manufacturer;

      expect(sut.props.manufacturer).toEqual(props.manufacturer);
      expect(typeof sut.props.manufacturer).toBe('string');
    });

    it('Getter of licensePlate fields', () => {
      expect(sut.licensePlate).toBeDefined();
      expect(sut.licensePlate).toEqual(props.licensePlate);
      expect(typeof sut.licensePlate).toBe('string');
    });

    it('Setter of licensePlate fields', () => {
      sut['licensePlate'] = props.licensePlate;

      expect(sut.props.licensePlate).toEqual(props.licensePlate);
      expect(typeof sut.props.licensePlate).toBe('string');
    });

    it('Getter of provider fields', () => {
      expect(sut.provider).toBeDefined();
      expect(sut.provider).toEqual(props.provider);
      expect(typeof sut.provider).toBe('string');
    });

    it('Setter of provider fields', () => {
      sut['provider'] = props.provider;

      expect(sut.props.provider).toEqual(props.provider);
      expect(typeof sut.props.provider).toBe('string');
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

    it('Getter of teamId fields', () => {
      expect(sut.teamId).toBeDefined();
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('updated methods', () => {
    it('should update a Equipment', () => {
      sut.update({
        ...props,
        model: 'Fiat 47',
        licensePlate: 'ABC-2020',
        status: 'ACTIVE',
      });
      expect(EquipmentEntity.validate).toHaveBeenCalled();
      expect(sut.props.model).toEqual('Fiat 47');
      expect(sut.props.licensePlate).toEqual('ABC-2020');
      expect(sut.props.status).toEqual('ACTIVE');
    });
  });
});
