import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerRepository } from '../../../core/domain/repositories/customer.repository';
import { Customer } from '../../../core/domain/entities/customer.entity';

@Injectable()
export class TypeOrmCustomerRepository implements ICustomerRepository {
  private readonly logger = new Logger(TypeOrmCustomerRepository.name);

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findById(id: number): Promise<Customer | null> {
    this.logger.log(`Fetching customer with id: ${id}`);
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (customer) {
        this.logger.log(`Customer with id ${id} found`);
      } else {
        this.logger.warn(`Customer with id ${id} not found`);
      }
      return customer;
    } catch (error) {
      this.logger.error(`Failed to fetch customer with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to find customer');
    }
  }

  async findAll(): Promise<Customer[]> {
    this.logger.log('Fetching all customers');
    try {
      const customers = await this.customerRepository.find();
      this.logger.log(`Found ${customers.length} customers`);
      return customers;
    } catch (error) {
      this.logger.error('Failed to fetch all customers', error.stack);
      throw new InternalServerErrorException('Failed to find customers');
    }
  }

  async save(customer: Customer): Promise<Customer> {
    this.logger.log(`Saving customer with CPF: ${customer.cpf}`);
    try {
      const existingCustomer = await this.customerRepository.findOne({
        where: {
          cpf: customer.cpf,
          userCreator: { id: customer.userCreator.id },
        },
      });

      if (existingCustomer) {
        this.logger.warn(
          `CPF ${customer.cpf} is already registered for user ${customer.userCreator.id}`,
        );
        throw new ConflictException(
          'This CPF is already registered for this user.',
        );
      }

      const savedCustomer = await this.customerRepository.save(customer);
      this.logger.log(
        `Customer saved successfully with id ${savedCustomer.id}`,
      );
      return savedCustomer;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw error;
    }
  }

  async update(id: number, customer: Customer): Promise<void> {
    this.logger.log(`Updating customer with id: ${id}`);
    try {
      await this.customerRepository.update(id, customer);
      this.logger.log(`Customer with id ${id} updated successfully`);
    } catch (error) {
      this.logger.error(`Failed to update customer with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting customer with id: ${id}`);
    try {
      await this.customerRepository.delete(id);
      this.logger.log(`Customer with id ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Failed to delete customer with id ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete customer');
    }
  }
}
