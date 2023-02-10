import {getInitials} from './getInitials';

describe('getInitials()', () => {
  it('returns correct initials for a given full name', () => {
    expect(getInitials('John Wayne')).toBe('JW');
  });

  it('returns the initials uppercased', () => {
    expect(getInitials('john wayne')).toBe('JW');
  });

  it('returns the initials for first and last part of the name', () => {
    expect(getInitials('John Henry Bob Travolta')).toBe('JT');
  });
});
