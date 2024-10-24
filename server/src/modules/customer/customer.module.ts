import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/core/domain/entities/customer.entity';
import { CreateCustomerUseCase } from 'src/core/use-cases/customer/create-customer.usecase';
import { TypeOrmUserRepository } from 'src/infra/database/typeorm/user.repository';
import { User } from 'src/core/domain/entities/user.entity';
import { TypeOrmCustomerRepository } from 'src/infra/database/typeorm/costumer.repository';
import { CustomerController } from 'src/infra/http/controllers/customer.controller';
import { GetAllCustomersUseCase } from 'src/core/use-cases/customer/get-all-customers.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User])],
  controllers: [CustomerController],
  providers: [
    CreateCustomerUseCase,
    GetAllCustomersUseCase,
    {
      provide: 'ICustomerRepository',
      useClass: TypeOrmCustomerRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [
    'ICustomerRepository',
    CreateCustomerUseCase,
    GetAllCustomersUseCase,
  ],
})
export class CustomerModule {}
