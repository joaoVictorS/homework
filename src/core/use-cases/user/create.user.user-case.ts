import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { TypeOrmUserRepository } from 'src/infra/database/typeorm/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: TypeOrmUserRepository,
  ) {}

  async execute(name: string): Promise<void> {
    const user = new User();
    user.name = name;
    user.balance = 0;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    await this.userRepository.save(user);
  }
}
