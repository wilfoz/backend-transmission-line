import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { TowerEntity, TowerProps } from '../../towers.entity';

describe('UserEntity Unit Tests', () => {
  let props: TowerProps;
  let sut: TowerEntity;

  beforeEach(() => {
    TowerEntity.validate = jest.fn();
    props = towerDataBuilder({});
    sut = new TowerEntity(props);
  });

  it('Constructor method', () => {
    expect(TowerEntity.validate).toHaveBeenCalled();
    expect(sut.props.code).toEqual(props.code);
    expect(sut.props.tower).toEqual(props.tower);
    expect(sut.props.coordinates).toEqual(props.coordinates);
    expect(sut.props.distance).toEqual(props.distance);
    expect(sut.props.height).toEqual(props.height);
    expect(sut.props.weight).toEqual(props.weight);
    expect(sut.props.type_of_foundation_A).toEqual(props.type_of_foundation_A);
    expect(sut.props.type_of_foundation_B).toEqual(props.type_of_foundation_B);
    expect(sut.props.type_of_foundation_C).toEqual(props.type_of_foundation_C);
    expect(sut.props.type_of_foundation_D).toEqual(props.type_of_foundation_D);
    expect(sut.props.type_of_foundation_MC).toEqual(
      props.type_of_foundation_MC,
    );
    expect(sut.props.embargo).toEqual(props.embargo);
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

    it('Getter of tower fields', () => {
      expect(sut.tower).toBeDefined();
      expect(sut.tower).toEqual(props.tower);
      expect(typeof sut.tower).toBe('string');
    });

    it('Setter of tower fields', () => {
      sut['tower'] = '10/1';

      expect(sut.props.tower).toEqual('10/1');
      expect(typeof sut.props.tower).toBe('string');
    });

    it('Getter of coordinates fields', () => {
      expect(sut.coordinates).toBeDefined();
      expect(sut.coordinates).toEqual(props.coordinates);
      expect(typeof sut.coordinates).toBe('object');
    });

    it('Setter of coordinates fields', () => {
      sut['coordinates'] = props.coordinates;

      expect(sut.props.coordinates).toEqual(props.coordinates);
      expect(typeof sut.props.coordinates).toBe('object');
    });

    it('Getter of height fields', () => {
      expect(sut.height).toBeDefined();
      expect(sut.height).toEqual(props.height);
      expect(typeof sut.height).toBe('number');
    });

    it('Setter of height fields', () => {
      sut['height'] = props.height;

      expect(sut.props.height).toEqual(props.height);
      expect(typeof sut.props.height).toBe('number');
    });

    it('Getter of weight fields', () => {
      expect(sut.weight).toBeDefined();
      expect(sut.weight).toEqual(props.weight);
      expect(typeof sut.weight).toBe('number');
    });

    it('Setter of weight fields', () => {
      sut['weight'] = props.weight;

      expect(sut.props.weight).toEqual(props.weight);
      expect(typeof sut.props.weight).toBe('number');
    });

    it('Getter of type_of_foundation_A fields', () => {
      expect(sut.type_of_foundation_A).toBeDefined();
      expect(sut.type_of_foundation_A).toEqual(props.type_of_foundation_A);
      expect(typeof sut.type_of_foundation_A).toBe('string');
    });

    it('Setter of type_of_foundation_A fields', () => {
      sut['type_of_foundation_A'] = props.type_of_foundation_A;

      expect(sut.props.type_of_foundation_A).toEqual(
        props.type_of_foundation_A,
      );
      expect(typeof sut.props.type_of_foundation_A).toBe('string');
    });

    it('Getter of embargo fields', () => {
      expect(sut.embargo).toBeDefined();
      expect(sut.embargo).toEqual(props.embargo);
      expect(typeof sut.embargo).toBe('string');
    });

    it('Setter of embargo fields', () => {
      sut['embargo'] = props.embargo;

      expect(sut.props.embargo).toEqual(props.embargo);
      expect(typeof sut.props.embargo).toBe('string');
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('updated methods', () => {
    it('should update a tower', () => {
      sut.updateTower('100/1');
      expect(TowerEntity.validate).toHaveBeenCalled();
      expect(sut.props.tower).toEqual('100/1');
    });

    it('should update a type', () => {
      sut.updateType('EM');
      expect(TowerEntity.validate).toHaveBeenCalled();
      expect(sut.props.type).toEqual('EM');
    });

    it('should update a type', () => {
      sut.update(props);
      expect(TowerEntity.validate).toHaveBeenCalled();
      expect(sut.props).toEqual(props);
    });
  });
});
