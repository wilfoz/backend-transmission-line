import ValueObject from '../value-object';

class StubValueObject extends ValueObject { }

describe('ValueObject Unit Test', () => {
  it('should set value', () => {
    let vo = new StubValueObject('string value');
    expect(vo.value).toBe('string value');

    vo = new StubValueObject({ prop1: 'value1' });
    expect(vo.value).toStrictEqual({ prop1: 'value1' });
  });

  it('should convert to a string', () => {
    const date = new Date();
    const arrange = [
      { received: 'string value', expected: 'string value' },
      { received: '', expected: '' },
      { received: 0, expected: '0' },
      { received: 1, expected: '1' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: date, expected: date.toString() },
      {
        received: { prop1: 'value1' },
        expected: JSON.stringify({ prop1: 'value1' }),
      },
    ];

    arrange.forEach(value => {
      const vo = new StubValueObject(value.received);
      expect(vo + '').toBe(value.expected);
    });
  });
});
