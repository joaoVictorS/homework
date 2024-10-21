import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  findById(id: number): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
  update(id: number, customer: Customer): Promise<void>;
  delete(id: number): Promise<void>;
}
