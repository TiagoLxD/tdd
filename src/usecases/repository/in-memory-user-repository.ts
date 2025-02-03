import { UserData } from '../../entities'
import { UserRepository } from '../ports/user-repository'

export class InMemoryUserRepository implements UserRepository {
    constructor(private readonly repository: UserData[]) {}

    async add(user: UserData): Promise<void> {
        !(await this.exists(user)) && this.repository.push(user)
    }

    async findUserByEmail(email: string): Promise<UserData> {
        return this.repository.find((user) => user.email === email) ?? null
    }

    async findAllUsers(): Promise<UserData[]> {
        return Promise.resolve([...this.repository])
    }

    async exists(user: UserData): Promise<boolean> {
        return (await this.findUserByEmail(user.email)) !== null
    }
}
