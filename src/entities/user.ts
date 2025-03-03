import { Either, left, right } from '@/shared'
import { Name } from './name'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { UserData } from './user-data'

export class User {
    public readonly email: Email
    public readonly name: Name

    private constructor(name: Name, email: Email) {
        this.name = name
        this.email = email
    }

    public static create(
        userData: UserData,
    ): Either<InvalidNameError | InvalidEmailError, User> {
        const nameOrError = Name.create(userData.name)
        if (nameOrError.isLeft()) return left(nameOrError.value)

        const emailOrError = Email.create(userData.email)
        if (emailOrError.isLeft()) return left(emailOrError.value)

        return right(new User(nameOrError.value, emailOrError.value))
    }
}
