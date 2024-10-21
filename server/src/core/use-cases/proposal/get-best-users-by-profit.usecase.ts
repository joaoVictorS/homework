import { Injectable, Inject } from '@nestjs/common';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';

@Injectable()
export class GetBestUsersByProfitUseCase {
  constructor(
    @Inject('IProposalRepository')
    private readonly proposalRepository: IProposalRepository,
  ) {}

  async execute(start: Date | string, end: Date | string): Promise<any> {
    return await this.proposalRepository.getBestUsersByProfit(start, end);
  }
}
