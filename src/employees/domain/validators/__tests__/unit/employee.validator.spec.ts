import { employeeDataBuilder } from '@/employees/domain/helpers/employee-data-builder';
import {
  EmployeeRules,
  EmployeeValidator,
  EmployeeValidatorFactory,
} from '../../employee.validator';

describe('EmployeeValidator Integration Tests', () => {
  let sut: EmployeeValidator;

  beforeEach(() => {
    sut = EmployeeValidatorFactory.create();
  });

  describe('Fields', () => {
    it('valid fields', () => {
      const props = employeeDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new EmployeeRules(props));
    });

    describe('Employee fields', () => {
      it('invalidation cases for registration field', () => {
        let isValid = sut.validate(null as any);
        expect(isValid).toBeFalsy();
        expect(sut.errors['registration']).toStrictEqual([
          'registration should not be empty',
          'registration must be a string',
          'registration must be shorter than or equal to 255 characters',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          registration: 1 as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['registration']).toStrictEqual([
          'registration must be a string',
          'registration must be shorter than or equal to 255 characters',
        ]);
      });
      it('invalidation cases for fullName field', () => {
        let isValid = sut.validate(null as any);
        expect(isValid).toBeFalsy();
        expect(sut.errors['fullName']).toStrictEqual([
          'fullName should not be empty',
          'fullName must be a string',
          'fullName must be shorter than or equal to 255 characters',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          fullName: '' as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['fullName']).toStrictEqual([
          'fullName should not be empty',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          fullName: 1 as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['fullName']).toStrictEqual([
          'fullName must be a string',
          'fullName must be shorter than or equal to 255 characters',
        ]);
      });

      it('invalidation cases for occupation field', () => {
        let isValid = sut.validate(null as any);
        expect(isValid).toBeFalsy();
        expect(sut.errors['occupation']).toStrictEqual([
          'occupation should not be empty',
          'occupation must be a string',
          'occupation must be shorter than or equal to 255 characters',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          occupation: '' as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['occupation']).toStrictEqual([
          'occupation should not be empty',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          occupation: 1 as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['occupation']).toStrictEqual([
          'occupation must be a string',
          'occupation must be shorter than or equal to 255 characters',
        ]);
      });

      it('invalidation cases for leadership field', () => {
        let isValid = sut.validate(null as any);
        expect(isValid).toBeFalsy();
        expect(sut.errors['leadership']).toStrictEqual([
          'leadership should not be empty',
          'leadership must be a boolean value',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          leadership: '' as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['leadership']).toStrictEqual([
          'leadership should not be empty',
          'leadership must be a boolean value',
        ]);
      });

      it('invalidation cases for status field', () => {
        let isValid = sut.validate(null as any);
        expect(isValid).toBeFalsy();
        expect(sut.errors['status']).toStrictEqual([
          'status should not be empty',
          'status must be a string',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          status: '' as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['status']).toStrictEqual([
          'status should not be empty',
        ]);

        isValid = sut.validate({
          ...employeeDataBuilder({}),
          status: 1 as any,
        });
        expect(isValid).toBeFalsy();
        expect(sut.errors['status']).toStrictEqual(['status must be a string']);
      });

      it('invalidation cases for createdAt field', () => {
        const props = employeeDataBuilder({});
        let isValid = sut.validate({ ...props, createdAt: 10 as any });
        expect(isValid).toBeFalsy();
        expect(sut.errors['createdAt']).toStrictEqual([
          'createdAt must be a Date instance',
        ]);

        isValid = sut.validate({ ...props, createdAt: '' as any });
        expect(isValid).toBeFalsy();
        expect(sut.errors['createdAt']).toStrictEqual([
          'createdAt must be a Date instance',
        ]);
      });
    });
  });
});
