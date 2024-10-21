import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/domain/entities/user.entity';
import { CreateUserUseCase } from 'src/core/use-cases/user/create.user.user-case';
import { GetAllUsersUseCase } from 'src/core/use-cases/user/get-all-users.usecase';
import { GetUserByIdUseCase } from 'src/core/use-cases/user/get-user-by-id.usecase';
import { TypeOrmUserRepository } from 'src/infra/database/typeorm/user.repository';
import { UserController } from 'src/infra/http/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [
    'IUserRepository',
    GetUserByIdUseCase,
    CreateUserUseCase,
    GetAllUsersUseCase,
  ],
})
export class UserModule {}
