import { Injectable, Inject } from '@nestjs/common';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';
import { Proposal } from '../../domain/entities/proposal.entity';

@Injectable()
export class GetProposalByIdUseCase {
  constructor(
    @Inject('IProposalRepository')
    private readonly proposalRepository: IProposalRepository,
  ) {}

  async execute(id: number): Promise<Proposal | null> {
    return await this.proposalRepository.findById(id);
  }
}
