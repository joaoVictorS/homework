import { Injectable, Inject } from '@nestjs/common';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';

@Injectable()
export class GetProfitByStatusUseCase {
  constructor(
    @Inject('IProposalRepository')
    private readonly proposalRepository: IProposalRepository,
  ) {}

  async execute(): Promise<any> {
    return await this.proposalRepository.getProfitByStatus();
  }
}
