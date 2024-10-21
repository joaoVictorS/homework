import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { IUserRepository } from 'src/core/domain/repositories/user.repository';

@Injectable()
export class GetAllCustomersUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    return await this.customerRepository.findAll();
  }
}
