import { UserRepository } from '../src/usecases/ports/user-repository';
import { UseData } from '../src/entities/user-data';
import { InMemoryUserRepository } from '../src/usecases/repository/in-memory-user-repository';

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const users: UseData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const user = await repo.findUserByEmail('any@email.com');

    expect(user).toBeNull();
  });

  test('should return user if it is found', async () => {
    const users: UseData[] = [];
    const name = 'any_name';
    const email = 'any@email.com';
    const user: UseData = { name, email };
    const repo: UserRepository = new InMemoryUserRepository(users);
    await repo.add(user);
    const userFound = await repo.findUserByEmail(email);
    expect(userFound).toEqual(user);
  });

  test('should return all users', async () => {
    const users: UseData[] = [
      { name: 'any_name', email: 'any_email' },
      { name: 'second_name', email: 'second_email' },
    ];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usersFound = await repo.findAllUsers();
    expect(usersFound).toEqual(users);
    expect(usersFound).toHaveLength(2);
  });
});
