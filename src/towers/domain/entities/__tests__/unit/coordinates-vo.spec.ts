import { InvalidTypeError } from '@/shared/domain/errors/invalid-type-error';
import { CoordinateProps, CoordinatesVO } from '../../coordinates-vo';

describe('CoordinatesVO Unit Tests', () => {
  let props: CoordinateProps;
  let sut: CoordinatesVO;
  const validateSpy = jest.spyOn(CoordinatesVO.prototype as any, 'validate');

  beforeEach(() => {
    props = {
      latitude: '111',
      longitude: '1111',
    };
  });

  it('should return error when type is invalid', () => {
    const expected = CoordinatesVO.create('1' as any);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(expected).toEqual(new InvalidTypeError('Type is invalid'));
  });

  it('should return entity coordinates', () => {
    const expected = CoordinatesVO.create(props);
    expect(validateSpy).toHaveBeenCalled();
    expect(expected.value).toStrictEqual({
      latitude: '111',
      longitude: '1111',
    });
  });
});
