import type { UseData } from '../../entities/user-data';
export interface UserRepository {
  add(user: UseData): Promise<void>;
  findUserByEmail(email: string): Promise<UseData>;
  findAllUsers(): Promise<UseData[]>;
  exists(user: UseData): Promise<boolean>;
}
