import { left, right, Either } from '@/shared'
import { InvalidNameError } from './errors/invalid-name-error'

export class Name {
    public readonly value: string

    private constructor(name: string) {
        this.value = name
    }

    public static create(name: string): Either<InvalidNameError, Name> {
        if (!Name.validate(name)) return left(new InvalidNameError())
        return right(new Name(name.trim()))
    }

    public static validate(name: string): boolean {
        const trimmed = name.trim()
        return trimmed.length >= 2 && trimmed.length <= 256
    }
}
