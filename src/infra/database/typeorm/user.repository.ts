import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../core/domain/repositories/user.repository';
import { User } from '../../../core/domain/entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  private readonly logger = new Logger(TypeOrmUserRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    this.logger.log(`Fetching user with id: ${id}`);
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user) {
        this.logger.log(`User with id ${id} found`);
      } else {
        this.logger.warn(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async save(user: User): Promise<User> {
    this.logger.log(`Saving user: ${user.name}`);
    try {
      const savedUser = await this.userRepository.save(user);
      this.logger.log(`User saved successfully with id ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to save user ${user.name}`, error.stack);
      throw new InternalServerErrorException('Failed to save user');
    }
  }
}
