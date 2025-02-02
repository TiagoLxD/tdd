import { InvalidEmailError, InvalidNameError, Name } from '.';
import { Either, left, right } from '../shared';
import { Email } from './email';
import { UseData } from './user-data';

export class User {
  private constructor(
    private readonly name: string,
    private readonly email: string
  ) {
    Object.freeze(this);
  }
  static create(user: UseData): Either<InvalidEmailError | InvalidNameError, User> {
    const emailOrError = Email.create(user.email);
    const nameOrError = Name.create(user.name);

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
    }

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError());
    }

    return right(new User(user.name, user.email));
  }
}
