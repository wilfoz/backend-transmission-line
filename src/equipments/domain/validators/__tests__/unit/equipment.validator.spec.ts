import { equipmentDataBuilder } from '@/equipments/domain/helpers/equipment-data-builder';
import {
  EquipmentRules,
  EquipmentValidator,
  EquipmentValidatorFactory,
} from '../../equipment.validator';

describe('EquipmentValidator Integration Tests', () => {
  let sut: EquipmentValidator;

  beforeEach(() => {
    sut = EquipmentValidatorFactory.create();
  });

  describe('Code field', () => {
    it('valid fields', () => {
      const props = equipmentDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new EquipmentRules(props));
    });

    it('invalidation cases for registration field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['registration']).toStrictEqual([
        'registration should not be empty',
        'registration must be a string',
        'registration must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        registration: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['registration']).toStrictEqual([
        'registration should not be empty',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        registration: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['registration']).toStrictEqual([
        'registration must be a string',
        'registration must be shorter than or equal to 255 characters',
      ]);
    });
  });

  describe('Equipment field', () => {
    it('invalidation cases for model field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['model']).toStrictEqual([
        'model should not be empty',
        'model must be a string',
        'model must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        model: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['model']).toStrictEqual(['model should not be empty']);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        model: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['model']).toStrictEqual([
        'model must be a string',
        'model must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for manufacturer field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['manufacturer']).toStrictEqual([
        'manufacturer should not be empty',
        'manufacturer must be a string',
        'manufacturer must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        manufacturer: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['manufacturer']).toStrictEqual([
        'manufacturer should not be empty',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        manufacturer: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['manufacturer']).toStrictEqual([
        'manufacturer must be a string',
        'manufacturer must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for licensePlate field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['licensePlate']).toStrictEqual([
        'licensePlate should not be empty',
        'licensePlate must be a string',
        'licensePlate must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        licensePlate: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['licensePlate']).toStrictEqual([
        'licensePlate should not be empty',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        licensePlate: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['licensePlate']).toStrictEqual([
        'licensePlate must be a string',
        'licensePlate must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for provider field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['provider']).toStrictEqual([
        'provider should not be empty',
        'provider must be a string',
        'provider must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        provider: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['provider']).toStrictEqual([
        'provider should not be empty',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        provider: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['provider']).toStrictEqual([
        'provider must be a string',
        'provider must be shorter than or equal to 255 characters',
      ]);
    });

    it('invalidation cases for status field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['status']).toStrictEqual([
        'status should not be empty',
        'status must be a string',
        'status must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        status: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['status']).toStrictEqual([
        'status should not be empty',
      ]);

      isValid = sut.validate({
        ...equipmentDataBuilder({}),
        status: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['status']).toStrictEqual([
        'status must be a string',
        'status must be shorter than or equal to 255 characters',
      ]);
    });
  });
});
