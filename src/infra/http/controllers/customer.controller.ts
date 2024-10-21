import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/core/use-cases/customer/create-customer.usecase';
import { Request } from 'express';

@Controller('customers')
export class CustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async createCustomer(@Req() req: Request, @Body() body: any) {
    const user = req['user'];
    const { name, cpf } = body;

    const createdCustomer = await this.createCustomerUseCase.execute(
      user.id,
      name,
      cpf,
    );

    return createdCustomer;
  }
}
