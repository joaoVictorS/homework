import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async findById(id: number, userId: number): Promise<Proposal | null> {
    try {
      const proposal = await this.proposalRepository.findOne({
        where: { id, userCreator: { id: userId } },
        relations: ['userCreator', 'customer'],
      });
      return proposal;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find proposal');
    }
  }

  async findByUserId(userId: number): Promise<Proposal[]> {
    try {
      const proposals = await this.proposalRepository.find({
        where: { userCreator: { id: userId } },
        relations: ['userCreator'],
      });
      return proposals;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find proposals by user',
      );
    }
  }

  async save(proposal: Proposal): Promise<void> {
    try {
      await this.proposalRepository.save(proposal);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save proposal');
    }
  }

  async findPendingByUserId(userId: number): Promise<Proposal[]> {
    try {
      const proposals = await this.proposalRepository.find({
        where: { userCreator: { id: userId }, status: ProposalStatus.PENDING },
        relations: ['userCreator'],
      });
      return proposals;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find pending proposals',
      );
    }
  }

  async findRefusedByUserId(userId: number): Promise<Proposal[]> {
    try {
      const proposals = await this.proposalRepository.find({
        where: { userCreator: { id: userId }, status: ProposalStatus.REFUSED },
        relations: ['userCreator'],
      });
      return proposals;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find refused proposals',
      );
    }
  }

  async getProfitByStatus(): Promise<any> {
    try {
      const results = await this.proposalRepository
        .createQueryBuilder('proposal')
        .select('proposal.status', 'status')
        .addSelect('proposal.userCreatorId', 'userId')
        .addSelect('SUM(proposal.profit)', 'totalProfit')
        .groupBy('proposal.status')
        .addGroupBy('proposal.userCreatorId')
        .getRawMany();
      return results;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get profit by status');
    }
  }

  async getBestUsersByProfit(start: string, end: string): Promise<any> {
    try {
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

      const filteredProposals = proposals.filter((proposal) => {
        const createdAt = new Date(proposal.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });

      return filteredProposals;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get best users by profit',
      );
    }
  }
}
