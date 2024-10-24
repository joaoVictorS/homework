import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User | null>;
  findAll(): Promise<User[]>;
}
