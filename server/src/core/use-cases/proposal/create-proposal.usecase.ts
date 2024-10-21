import { Injectable, Inject } from '@nestjs/common';
import {
  Proposal,
  ProposalStatus,
} from '../../domain/entities/proposal.entity';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICustomerRepository } from 'src/core/domain/repositories/customer.repository';

@Injectable()
export class CreateProposalUseCase {
  constructor(
    @Inject('IProposalRepository')
    private readonly proposalRepository: IProposalRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(
    userId: number,
    customerId: number,
    profit: number,
  ): Promise<Proposal> {
    const user = await this.userRepository.findById(userId);
    const customer = await this.customerRepository.findById(customerId);

    if (!user || !customer) {
      throw new Error('User or Customer not found');
    }

    const proposal = new Proposal();
    proposal.userCreator = user;
    proposal.customer = customer;
    proposal.profit = profit;
    proposal.status = ProposalStatus.PENDING;
    proposal.createdAt = new Date();
    proposal.updatedAt = new Date();

    await this.proposalRepository.save(proposal);

    return proposal;
  }
}
