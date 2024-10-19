import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GetUserByIdUseCase } from '../../../core/use-cases/user/get-user-by-id.usecase';
import { GetProposalsByUserIdUseCase } from '../../../core/use-cases/proposal/get-proposals-by-user-id.usecase';
import { CreateUserUseCase } from 'src/core/use-cases/user/create.user.user-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getProposalsByUserIdUseCase: GetProposalsByUserIdUseCase,
  ) {}

  @Post()
  async createUser(@Body('name') name: string) {
    await this.createUserUseCase.execute(name);
    return { message: 'User created successfully' };
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.getUserByIdUseCase.execute(id);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Get(':id/proposals')
  async getProposalsByUserId(@Param('id') id: number) {
    const proposals = await this.getProposalsByUserIdUseCase.execute(id);
    return proposals;
  }
}
