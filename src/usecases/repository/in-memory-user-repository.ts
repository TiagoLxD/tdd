import { UserRepository } from '../ports/user-repository';
import { UseData } from '../../entities/user-data';

export class InMemoryUserRepository implements UserRepository {
  private repository: UseData[];
  constructor(repository: UseData[]) {
    this.repository = repository;
  }

  async add(user: UseData): Promise<void> {
    !(await this.exists(user)) && this.repository.push(user);
  }

  async findUserByEmail(email: string): Promise<UseData> {
    return this.repository.find(user => user.email === email) ?? null;
  }

  async findAllUsers(): Promise<UseData[]> {
    return Promise.resolve([...this.repository]);
  }

  async exists(user: UseData): Promise<boolean> {
    return (await this.findUserByEmail(user.email)) !== null;
  }
}
