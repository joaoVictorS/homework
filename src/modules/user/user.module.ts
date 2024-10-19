import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { UserController } from '../../infra/http/controllers/user.controller';
import { GetUserByIdUseCase } from '../../core/use-cases/user/get-user-by-id.usecase';
import { ProposalModule } from '../proposal/proposal.module';
import { CreateUserUseCase } from 'src/core/use-cases/user/create.user.user-case';
import { TypeOrmUserRepository } from 'src/infra/database/typeorm/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProposalModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    { provide: 'IUserRepository', useClass: TypeOrmUserRepository },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
