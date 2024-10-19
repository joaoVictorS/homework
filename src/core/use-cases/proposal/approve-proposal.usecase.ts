import { Injectable } from '@nestjs/common';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class ApproveProposalUseCase {
  constructor(
    private readonly proposalRepository: IProposalRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(proposalId: number, userId: number): Promise<void> {
    const proposal = await this.proposalRepository.findById(proposalId);
    if (!proposal) {
      throw new Error('Proposta não encontrada');
    }

    if (proposal.userCreator.id !== userId) {
      throw new Error('Usuário não autorizado para aprovar esta proposta');
    }

    proposal.approve();
    await this.proposalRepository.save(proposal);

    // Atualizar o balance do usuário
    const user = await this.userRepository.findById(userId);
    if (user) {
      user.balance += proposal.profit;
      await this.userRepository.save(user);
    }
  }
}
