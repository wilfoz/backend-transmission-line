import { productionDataBuilder } from '../../../helpers/production-data-builder';
import {
  ProductionRules,
  ProductionValidator,
  ProductionValidatorFactory,
} from '../../production.validator';

describe('ProductionValidator Integration Tests', () => {
  let sut: ProductionValidator;

  beforeEach(() => {
    sut = ProductionValidatorFactory.create();
  });

  describe('Code field', () => {
    it('valid fields', () => {
      const props = productionDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new ProductionRules(props));
    });

    it('invalidation cases for status field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['status']).toStrictEqual([
        'status must be one of the following values: EXECUTED, PROGRAMMED, PROGRESS',
        'status should not be empty',
        'status must be a string',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        status: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['status']).toStrictEqual([
        'status must be one of the following values: EXECUTED, PROGRAMMED, PROGRESS',
        'status should not be empty',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        status: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['status']).toStrictEqual([
        'status must be one of the following values: EXECUTED, PROGRAMMED, PROGRESS',
        'status must be a string',
      ]);
    });
  });

  describe('Production fields', () => {
    it('invalidation cases for comments field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['comments']).toStrictEqual([
        'comments should not be empty',
        'comments must be a string',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        comments: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['comments']).toStrictEqual([
        'comments should not be empty',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        comments: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['comments']).toStrictEqual([
        'comments must be a string',
      ]);
    });

    it('invalidation cases for teams field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['teams']).toStrictEqual([
        'teams should not be empty',
        'teams must be an array',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        teams: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['teams']).toStrictEqual([
        'teams should not be empty',
        'teams must be an array',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        teams: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['teams']).toStrictEqual([
        'teams should not be empty',
        'teams must be an array',
      ]);
    });

    it('invalidation cases for towers field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['towers']).toStrictEqual([
        'towers should not be empty',
        'towers must be an array',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        towers: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['towers']).toStrictEqual([
        'towers should not be empty',
        'towers must be an array',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        towers: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['towers']).toStrictEqual([
        'towers should not be empty',
        'towers must be an array',
      ]);
    });

    it('invalidation cases for taskId field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['taskId']).toStrictEqual([
        'taskId should not be empty',
        'taskId must be a string',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        taskId: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['taskId']).toStrictEqual([
        'taskId should not be empty',
      ]);

      isValid = sut.validate({
        ...productionDataBuilder({}),
        taskId: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['taskId']).toStrictEqual(['taskId must be a string']);
    });
  });
});
