import { towerDataBuilder } from '@/towers/domain/helpers/tower-data-builder';
import {
  TowerRules,
  TowerValidatorFactory,
  TowerValidator,
} from '../../tower.validator';

describe('TowerValidator Integration Tests', () => {
  let sut: TowerValidator;

  beforeEach(() => {
    sut = TowerValidatorFactory.create();
  });

  describe('Code field', () => {
    it('valid fields', () => {
      const props = towerDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new TowerRules(props));
    });

    it('invalidation cases for code field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code should not be empty',
        'code must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...towerDataBuilder({}),
        code: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code should not be empty',
        'code must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...towerDataBuilder({}),
        code: '1' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code must be a number conforming to the specified constraints',
      ]);
    });
  });

  describe('Tower field', () => {
    it('invalidation cases for tower field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['tower']).toStrictEqual([
        'tower should not be empty',
        'tower must be a string',
        'tower must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...towerDataBuilder({}),
        tower: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['tower']).toStrictEqual(['tower should not be empty']);

      isValid = sut.validate({
        ...towerDataBuilder({}),
        tower: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['tower']).toStrictEqual([
        'tower must be a string',
        'tower must be shorter than or equal to 255 characters',
      ]);
    });
  });

  describe('Type field', () => {
    it('invalidation cases for type field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['type']).toStrictEqual([
        'type should not be empty',
        'type must be a string',
        'type must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...towerDataBuilder({}),
        type: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['type']).toStrictEqual(['type should not be empty']);

      isValid = sut.validate({
        ...towerDataBuilder({}),
        type: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['type']).toStrictEqual([
        'type must be a string',
        'type must be shorter than or equal to 255 characters',
      ]);
    });
  });
});
