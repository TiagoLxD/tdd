import { UseCase } from '@/usecases/ports'
import { UserRepository } from '../ports/user-repository'
import { UserData, User } from '../../entities'

export class RegisterUserOnMailingList implements UseCase {
    constructor(private readonly userRepo: UserRepository) {}

    public async perform(request: User): Promise<UserData> {
        const userData: UserData = {
            name: request.name.value,
            email: request.email.value,
        }

        const userExists = await this.userRepo.exists(userData)
        if (!userExists) {
            await this.userRepo.add(userData)
        }

        return userData
    }
}
