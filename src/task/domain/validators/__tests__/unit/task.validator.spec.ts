import {
  TaskRules,
  TaskValidator,
  TaskValidatorFactory,
} from '../../task.validator';
import { taskDataBuilder } from '@/task/domain/helpers/task-data-builder';

describe('TowerValidator Integration Tests', () => {
  let sut: TaskValidator;

  beforeEach(() => {
    sut = TaskValidatorFactory.create();
  });

  describe('Code field', () => {
    it('valid fields', () => {
      const props = taskDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new TaskRules(props));
    });

    it('invalidation cases for code field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code should not be empty',
        'code must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        code: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code should not be empty',
        'code must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        code: '1' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code must be a number conforming to the specified constraints',
      ]);
    });
  });

  describe('Task field', () => {
    it('invalidation cases for name field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        name: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        name: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for code field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code should not be empty',
        'code must be a number conforming to the specified constraints',
      ]);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        code: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['code']).toStrictEqual([
        'code should not be empty',
        'code must be a number conforming to the specified constraints',
      ]);
    });

    it('invalidation cases for group field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['group']).toStrictEqual([
        'group should not be empty',
        'group must be a string',
        'group must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        group: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['group']).toStrictEqual(['group should not be empty']);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        group: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['group']).toStrictEqual([
        'group must be a string',
        'group must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for stage field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['stage']).toStrictEqual([
        'stage should not be empty',
        'stage must be a string',
        'stage must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        stage: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['stage']).toStrictEqual(['stage should not be empty']);

      isValid = sut.validate({
        ...taskDataBuilder({}),
        stage: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['stage']).toStrictEqual([
        'stage must be a string',
        'stage must be shorter than or equal to 255 characters',
      ]);
    });
  });
});
