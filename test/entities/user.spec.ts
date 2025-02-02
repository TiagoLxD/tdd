import { InvalidEmailError } from '../../src/entities/errors/invalid-email-error';
import { InvalidNameError } from '../../src/entities/errors/invalid-name-error';
import { User } from '../../src/entities/user';
import { left, right } from '../../src/shared';

describe('User', () => {
  test('should not create user with invlaid email address', () => {
    const email = 'invalid_email';
    const error = User.create({ name: 'any', email });
    expect(error).toEqual(left(new InvalidEmailError()));
  });

  test('should not create user with invalid name to few characteres', () => {
    const name = 'O      ';
    const error = User.create({ name, email: 'any@email.com' });
    expect(error).toEqual(left(new InvalidNameError()));
  });

  test('should   create user with valid data', () => {
    const name = 'tiago';
    const email = 'any@email.com';
    const user = User.create({ name, email }).value;
    expect((user as any).name).toBe(name);
  });
});
