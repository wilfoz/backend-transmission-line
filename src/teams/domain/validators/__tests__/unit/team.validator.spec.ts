import { teamDataBuilder } from '@/teams/domain/helpers/team-data-builder';
import {
  TeamRules,
  TeamValidator,
  TeamValidatorFactory,
} from '../../team.validator';

describe('TeamValidator Integration Tests', () => {
  let sut: TeamValidator;

  beforeEach(() => {
    sut = TeamValidatorFactory.create();
  });

  describe('Code field', () => {
    it('valid fields', () => {
      const props = teamDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new TeamRules(props));
    });

    it('invalidation cases for name field', () => {
      let isValid = sut.validate(null as any);
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...teamDataBuilder({}),
        name: '' as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({
        ...teamDataBuilder({}),
        name: 1 as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);
    });
  });
});
