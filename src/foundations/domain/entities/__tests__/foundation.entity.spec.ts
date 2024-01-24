import { foundationDataBuilder } from '../../helpers/foundation-data-builder';
import { FoundationEntity, FoundationProps } from '../foundation.entity';

describe('FoundationEntity Unit Tests', () => {
  let props: FoundationProps;
  let sut: FoundationEntity;

  beforeEach(() => {
    FoundationEntity.validate = jest.fn();
    props = foundationDataBuilder({});
    sut = new FoundationEntity(props);
  });

  it('Constructor method', () => {
    expect(FoundationEntity.validate).toHaveBeenCalled();
    expect(sut.props.project).toEqual(props.project);
    expect(sut.props.revision).toEqual(props.revision);
    expect(sut.props.description).toEqual(props.description);
    expect(sut.props.excavation_volume).toEqual(props.excavation_volume);
    expect(sut.props.concrete_volume).toEqual(props.concrete_volume);
    expect(sut.props.backfill_volume).toEqual(props.backfill_volume);
    expect(sut.props.steel_volume).toEqual(props.steel_volume);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  describe('Getters and Setters', () => {
    it('Getter of registration fields', () => {
      expect(sut.project).toBeDefined();
      expect(sut.project).toEqual(props.project);
      expect(typeof sut.project).toBe('string');
    });

    it('Setter of project fields', () => {
      sut['project'] = '1';

      expect(sut.props.project).toEqual('1');
      expect(typeof sut.props.project).toBe('string');
    });

    it('Getter of revision fields', () => {
      expect(sut.revision).toBeDefined();
      expect(sut.revision).toEqual(props.revision);
      expect(typeof sut.revision).toBe('string');
    });

    it('Setter of revision fields', () => {
      sut['revision'] = 'test';

      expect(sut.props.revision).toEqual('test');
      expect(typeof sut.props.revision).toBe('string');
    });

    it('Getter of description fields', () => {
      expect(sut.description).toBeDefined();
      expect(sut.description).toEqual(props.description);
      expect(typeof sut.description).toBe('string');
    });

    it('Setter of description fields', () => {
      sut['description'] = props.description;

      expect(sut.props.description).toEqual(props.description);
      expect(typeof sut.props.description).toBe('string');
    });

    it('Getter of excavation_volume fields', () => {
      expect(sut.excavation_volume).toBeDefined();
      expect(sut.excavation_volume).toEqual(props.excavation_volume);
      expect(typeof sut.excavation_volume).toBe('number');
    });

    it('Setter of excavation_volume fields', () => {
      sut['excavation_volume'] = props.excavation_volume;

      expect(sut.props.excavation_volume).toEqual(props.excavation_volume);
      expect(typeof sut.props.excavation_volume).toBe('number');
    });

    it('Getter of concrete_volume fields', () => {
      expect(sut.concrete_volume).toBeDefined();
      expect(sut.concrete_volume).toEqual(props.concrete_volume);
      expect(typeof sut.concrete_volume).toBe('number');
    });

    it('Setter of concrete_volume fields', () => {
      sut['concrete_volume'] = props.concrete_volume;

      expect(sut.props.concrete_volume).toEqual(props.concrete_volume);
      expect(typeof sut.props.concrete_volume).toBe('number');
    });

    it('Getter of backfill_volume fields', () => {
      expect(sut.backfill_volume).toBeDefined();
      expect(sut.backfill_volume).toEqual(props.backfill_volume);
      expect(typeof sut.backfill_volume).toBe('number');
    });

    it('Setter of backfill_volume fields', () => {
      sut['backfill_volume'] = props.backfill_volume;

      expect(sut.props.backfill_volume).toEqual(props.backfill_volume);
      expect(typeof sut.props.backfill_volume).toBe('number');
    });

    it('Getter of steel_volume fields', () => {
      expect(sut.steel_volume).toBeDefined();
      expect(sut.steel_volume).toEqual(props.steel_volume);
      expect(typeof sut.steel_volume).toBe('number');
    });

    it('Setter of steel_volume fields', () => {
      sut['steel_volume'] = props.steel_volume;

      expect(sut.props.steel_volume).toEqual(props.steel_volume);
      expect(typeof sut.props.steel_volume).toBe('number');
    });

    it('Getter of createdAt fields', () => {
      expect(sut.createdAt).toBeDefined();
      expect(sut.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('updated methods', () => {
    it('should update a Foundation', () => {
      sut.update({
        ...props,
        project: 'FFFF-FUND-A53-0001',
        revision: '0A',
        description: 'AP-TCB-AFL-0.5',
      });
      expect(FoundationEntity.validate).toHaveBeenCalled();
      expect(sut.props.project).toEqual('FFFF-FUND-A53-0001');
      expect(sut.props.revision).toEqual('0A');
      expect(sut.props.description).toEqual('AP-TCB-AFL-0.5');
    });
  });
});
