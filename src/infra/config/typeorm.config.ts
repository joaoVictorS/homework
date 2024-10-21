import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { Proposal } from '../../core/domain/entities/proposal.entity';
import { Customer } from '../../core/domain/entities/customer.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data.db', // Banco de dados SQLite para desenvolvimento
  entities: [User, Proposal, Customer],
  synchronize: false, // Definido como false, pois estamos usando migrations
  migrations: ['dist/infra/database/migrations/*.js'],
};
