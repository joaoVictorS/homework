import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProposalRepository } from '../../../core/domain/repositories/proposal.repository';
import {
  Proposal,
  ProposalStatus,
} from '../../../core/domain/entities/proposal.entity';

@Injectable()
export class TypeOrmProposalRepository implements IProposalRepository {
  private readonly logger = new Logger(TypeOrmProposalRepository.name);

  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) {}

  async findById(id: number, userId: number): Promise<Proposal | null> {
    this.logger.log(`Fetching proposal with id ${id} for user ${userId}`);
    try {
      const proposal = await this.proposalRepository.findOne({
        where: { id, userCreator: { id: userId } },
        relations: ['userCreator', 'customer'],
      });

      if (!proposal) {
        this.logger.warn(`Proposal with id ${id} not found for user ${userId}`);
      } else {
        this.logger.log(`Proposal with id ${id} found for user ${userId}`);
      }

      return proposal;
    } catch (error) {
      this.logger.error(
        `Failed to fetch proposal with id ${id} for user ${userId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to find proposal');
    } finally {
      this.logger.log(
        `Finished fetching proposal with id ${id} for user ${userId}`,
      );
    }
  }

  async findByUserId(userId: number): Promise<Proposal[]> {
    this.logger.log(`Fetching proposals for user ${userId}`);
    try {
      const proposals = await this.proposalRepository.find({
        where: { userCreator: { id: userId } },
        relations: ['userCreator'],
      });

      return proposals;
    } catch (error) {
      this.logger.error(
        `Failed to fetch proposals for user ${userId}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to find proposals by user',
      );
    } finally {
      this.logger.log(`Finished fetching proposals for user ${userId}`);
    }
  }

  async save(proposal: Proposal): Promise<void> {
    this.logger.log(`Saving proposal for user ${proposal.userCreator.id}`);
    try {
      await this.proposalRepository.save(proposal);
    } catch (error) {
      this.logger.error(
        `Failed to save proposal for user ${proposal.userCreator.id}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to save proposal');
    } finally {
      this.logger.log(`Finished saving proposal with id ${proposal.id}`);
    }
  }

  async findPendingByUserId(userId: number): Promise<Proposal[]> {
    this.logger.log(`Fetching pending proposals for user ${userId}`);
    try {
      const proposals = await this.proposalRepository.find({
        where: { userCreator: { id: userId }, status: ProposalStatus.PENDING },
        relations: ['userCreator'],
      });

      return proposals;
    } catch (error) {
      this.logger.error(
        `Failed to fetch pending proposals for user ${userId}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to find pending proposals',
      );
    } finally {
      this.logger.log(`Finished fetching pending proposals for user ${userId}`);
    }
  }

  async findRefusedByUserId(userId: number): Promise<Proposal[]> {
    try {
      this.logger.log(`User ID: ${userId}, Status: ${ProposalStatus.REFUSED}`);
      const proposals = await this.proposalRepository.find({
        where: {
          userCreator: { id: userId },
          status: ProposalStatus.REFUSED,
        },
        relations: ['userCreator'],
      });

      this.logger.log(`Proposals fetched: ${proposals.length}`);
      return proposals;
    } catch (error) {
      this.logger.error(
        `Failed to fetch refused proposals for user ${userId}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to find refused proposals',
      );
    } finally {
      this.logger.log(`Finished fetching refused proposals for user ${userId}`);
    }
  }

  async getProfitByStatus(): Promise<any> {
    this.logger.log('Fetching profit by status for all proposals');
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
      this.logger.error('Failed to fetch profit by status', error.stack);
      throw new InternalServerErrorException('Failed to get profit by status');
    } finally {
      this.logger.log('Finished fetching profit by status');
    }
  }

  async getBestUsersByProfit(start: string, end: string): Promise<any> {
    this.logger.log(
      `Fetching best users by profit between ${start} and ${end}`,
    );
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
      this.logger.error(
        `Failed to fetch best users by profit between ${start} and ${end}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to get best users by profit',
      );
    } finally {
      this.logger.log(
        `Finished fetching best users by profit between ${start} and ${end}`,
      );
    }
  }
}
