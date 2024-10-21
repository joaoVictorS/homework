import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from 'src/core/domain/entities/user.entity';
import { CreateUserUseCase } from 'src/core/use-cases/user/create.user.user-case';
import { GetUserByIdUseCase } from 'src/core/use-cases/user/get-user-by-id.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  async createUser(@Body('name') name: string): Promise<void> {
    return await this.createUserUseCase.execute(name);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return await this.getUserByIdUseCase.execute(id);
  }
}
