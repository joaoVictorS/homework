import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProposalRepository } from '../../../core/domain/repositories/proposal.repository';
import {
  Proposal,
  ProposalStatus,
} from '../../../core/domain/entities/proposal.entity';

@Injectable()
export class TypeOrmProposalRepository implements IProposalRepository {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) {}

  async findById(id: number): Promise<Proposal | null> {
    return this.proposalRepository.findOne({
      where: { id },
      relations: ['userCreator', 'customer'],
    });
  }

  async findByUserId(userId: number): Promise<Proposal[]> {
    return this.proposalRepository.find({
      where: { userCreator: { id: userId } },
      relations: ['userCreator'],
    });
  }

  async save(proposal: Proposal): Promise<void> {
    await this.proposalRepository.save(proposal);
  }

  async findPendingByUserId(userId: number): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { userCreator: { id: userId }, status: ProposalStatus.PENDING },
      relations: ['userCreator'],
    });
  }

  async findRefusedByUserId(userId: number): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { userCreator: { id: userId }, status: ProposalStatus.REFUSED },
      relations: ['userCreator'],
    });
  }

  async getProfitByStatus(): Promise<any> {
    return await this.proposalRepository
      .createQueryBuilder('proposal')
      .select('proposal.status', 'status')
      .addSelect('proposal.userCreatorId', 'userId')
      .addSelect('SUM(proposal.profit)', 'totalProfit')
      .groupBy('proposal.status')
      .addGroupBy('proposal.userCreatorId')
      .getRawMany();
  }

  async getBestUsersByProfit(start: string, end: string): Promise<any> {
    const proposals = await this.proposalRepository
      .createQueryBuilder('proposal')
      .select('proposal.userCreatorId', 'userId')
      .addSelect('SUM(proposal.profit)', 'totalProfit')
      .addSelect('proposal.createdAt', 'createdAt')
      .where('proposal.status = :status', { status: 'SUCCESSFUL' })
      .groupBy('proposal.userCreatorId, proposal.createdAt')
      .orderBy('totalProfit', 'DESC')
      .getRawMany();

    const startDate = new Date(start);
    const endDate = new Date(end);

    return proposals.filter((proposal) => {
      const createdAt = new Date(proposal.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }
}
