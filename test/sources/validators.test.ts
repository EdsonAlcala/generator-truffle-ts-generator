import { requiredFor } from '../../app/sources/validators';

describe('validators tests', () => {
  describe('requiredFor()', () => {
    it('should return false when no input value is passed', () => {
      const field = 'any';
      const expectedResult = `${field} cannot be empty`;

      const result = requiredFor(field)('');

      expect(result).toEqual(expectedResult);
    });

    it('should return true when a input value is passed', () => {
      const expectedResult = true;
      const inputValue = 'anything';

      const result = requiredFor('any')(inputValue);

      expect(result).toEqual(expectedResult);
    });
  });
});
