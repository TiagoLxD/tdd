import { InvalidNameError } from '.';
import { Either, left, right } from '../shared';

export class Name {
  private constructor(private readonly name: string) {
    Object.freeze(this);
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError());
    }
    return right(new Name(name));
  }
  static validate(name: string): boolean {
    if (!name) return false;
    if (name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }
    return true;
  }
}
