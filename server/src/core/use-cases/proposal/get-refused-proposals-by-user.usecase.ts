import { Injectable, Inject } from '@nestjs/common';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';
import { Proposal } from '../../domain/entities/proposal.entity';

@Injectable()
export class GetRefusedProposalsByUserUseCase {
  constructor(
    @Inject('IProposalRepository')
    private readonly proposalRepository: IProposalRepository,
  ) {}

  async execute(userId: number): Promise<Proposal[]> {
    return await this.proposalRepository.findRefusedByUserId(userId);
  }
}
