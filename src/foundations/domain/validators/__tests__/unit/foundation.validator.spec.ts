import { foundationDataBuilder } from '../../../helpers/foundation-data-builder';
import {
  FoundationRules,
  FoundationValidator,
  FoundationValidatorFactory,
} from '../../foundation.validator';

describe('FoundationValidator Integration Tests', () => {
  let sut: FoundationValidator;

  beforeEach(() => {
    sut = FoundationValidatorFactory.create();
  });

  describe('Equipment field', () => {
    it('valid fields', () => {
      const props = foundationDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new FoundationRules(props));
    });

    it('invalidation cases for project field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['project']).toStrictEqual([
        'project should not be empty',
        'project must be a string',
        'project must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        project: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['project']).toStrictEqual([
        'project should not be empty',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        project: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['project']).toStrictEqual([
        'project must be a string',
        'project must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for revision field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['revision']).toStrictEqual([
        'revision should not be empty',
        'revision must be a string',
        'revision must be shorter than or equal to 10 characters',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        revision: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['revision']).toStrictEqual([
        'revision should not be empty',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        revision: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['revision']).toStrictEqual([
        'revision must be a string',
        'revision must be shorter than or equal to 10 characters',
      ]);
    });

    it('invalidation cases for description field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['description']).toStrictEqual([
        'description should not be empty',
        'description must be a string',
        'description must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        description: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['description']).toStrictEqual([
        'description should not be empty',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        description: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['description']).toStrictEqual([
        'description must be a string',
        'description must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for excavation_volume field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['excavation_volume']).toStrictEqual([
        'excavation_volume should not be empty',
        'excavation_volume must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        excavation_volume: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['excavation_volume']).toStrictEqual([
        'excavation_volume should not be empty',
        'excavation_volume must be a number conforming to the specified constraints',
      ]);
    });

    it('invalidation cases for concrete_volume field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['concrete_volume']).toStrictEqual([
        'concrete_volume should not be empty',
        'concrete_volume must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        concrete_volume: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['concrete_volume']).toStrictEqual([
        'concrete_volume should not be empty',
        'concrete_volume must be a number conforming to the specified constraints',
      ]);
    });

    it('invalidation cases for backfill_volume field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['backfill_volume']).toStrictEqual([
        'backfill_volume should not be empty',
        'backfill_volume must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        backfill_volume: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['backfill_volume']).toStrictEqual([
        'backfill_volume should not be empty',
        'backfill_volume must be a number conforming to the specified constraints',
      ]);
    });

    it('invalidation cases for steel_volume field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['steel_volume']).toStrictEqual([
        'steel_volume should not be empty',
        'steel_volume must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...foundationDataBuilder({}),
        steel_volume: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['steel_volume']).toStrictEqual([
        'steel_volume should not be empty',
        'steel_volume must be a number conforming to the specified constraints',
      ]);
    });
  });
});
