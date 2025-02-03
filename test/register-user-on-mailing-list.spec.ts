import { UserRepository } from '../src/usecases/ports/user-repository'
import type { UserData } from '../src/entities/user-data'
import { InMemoryUserRepository } from '../src/usecases/repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
    test('should add user with complete data to mailing list', async () => {
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        // const usercase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
        // 	repo,
        // );
        // const name = "any_name";
        // const email = "any_email@email.com";
        // const response = await usercase.registerUserOnMailingList({ name, email });
        // const user = repo.findUserByEmail(email);
        // expect((await user).name).toBe(name);
    })
})
