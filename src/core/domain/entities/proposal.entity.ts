import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Customer } from './customer.entity';

export enum ProposalStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  REFUSED = 'REFUSED',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

@Entity({ name: 'proposals' })
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.proposals)
  userCreator: User;

  @ManyToOne(() => Customer, (customer) => customer.proposals)
  customer: Customer;

  @Column({ nullable: false, type: 'decimal', default: 0 })
  profit: number;

  @Column({
    nullable: false,
    type: 'varchar',
    default: ProposalStatus.PENDING,
  })
  status: ProposalStatus;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  approve() {
    if (this.status !== ProposalStatus.PENDING) {
      throw new Error('A proposta só pode ser aprovada se estiver pendente.');
    }
    this.status = ProposalStatus.SUCCESSFUL;
  }
}
