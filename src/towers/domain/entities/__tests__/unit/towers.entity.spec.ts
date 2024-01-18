import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import { TowerEntity, TowerProps } from '../../towers.entity';

describe('TowerEntity Unit Tests', () => {
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
    expect(sut.props.embargo).toEqual(props.embargo);
    expect(sut.props.foundations).toEqual(props.foundations);
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

    it('Getter of foundations fields', () => {
      expect(sut.getFoundations().length).toBe(0);
      expect(sut.getFoundations()).toEqual(props.foundations);
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('methods', () => {
    it('should get foundations', () => {
      const foundations = sut.getFoundations();
      expect(sut.foundations).toEqual(foundations);
    });

    // it('should add foundation', () => {
    //   sut.addFoundation('eccf59ae-685a-49d1-b213-8015bd6d2b34');
    //   expect(sut.getFoundations()).toEqual([
    //     'eccf59ae-685a-49d1-b213-8015bd6d2b34',
    //   ]);
    //   expect(sut.foundations).toHaveLength(1);
    // });

    // it('should update foundation', () => {
    //   sut.addFoundation('eccf59ae-685a-49d1-b213-8015bd6d2b34');
    //   sut.updateFoundation(
    //     'eccf59ae-685a-49d1-b213-8015bd6d2b34',
    //     '8033c931-7d11-404c-b1b7-f86583b5add7',
    //   );

    //   expect(sut.getFoundations()).toEqual([
    //     '8033c931-7d11-404c-b1b7-f86583b5add7',
    //   ]);
    //   expect(sut.foundations).toHaveLength(1);
    // });

    it('should update tower', () => {
      sut.update(props);
      expect(TowerEntity.validate).toHaveBeenCalled();
      expect(sut.props).toEqual(props);
    });
  });
});
