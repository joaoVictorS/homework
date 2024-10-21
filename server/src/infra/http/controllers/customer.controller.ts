import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/core/use-cases/customer/create-customer.usecase';
import { Request } from 'express';
import { GetAllCustomersUseCase } from 'src/core/use-cases/customer/get-all-customers.usecase';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
  ) {}

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

  @Get()
  async getAllCustomers() {
    return await this.getAllCustomersUseCase.execute();
  }
}
