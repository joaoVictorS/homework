import { Injectable, Inject } from '@nestjs/common';
import { Customer } from '../../domain/entities/customer.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICustomerRepository } from 'src/core/domain/repositories/customer.repository';
import { User } from 'src/core/domain/entities/user.entity';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number, name: string, cpf: string): Promise<Customer> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const customer = new Customer();
    customer.name = name;
    customer.cpf = cpf;
    customer.userCreator = { id: userId } as User;
    customer.createdAt = new Date();
    customer.updatedAt = new Date();

    await this.customerRepository.save(customer);
    return customer;
  }
}
