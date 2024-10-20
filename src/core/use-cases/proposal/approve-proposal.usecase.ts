import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IProposalRepository } from '../../domain/repositories/proposal.repository';
import { IUserRepository } from '../../domain/repositories/user.repository';
import {
  Proposal,
  ProposalStatus,
} from '../../domain/entities/proposal.entity';

@Injectable()
export class ApproveProposalUseCase {
  constructor(
    @Inject('IProposalRepository')
    private readonly proposalRepository: IProposalRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(proposalId: number, userId: number): Promise<Proposal> {
    const proposal = await this.proposalRepository.findById(proposalId, userId);

    if (!proposal) {
      throw new NotFoundException(
        `Proposta com ID ${proposalId} não encontrada`,
      );
    }

    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException('A proposta não está em estado pendente');
    }

    proposal.status = ProposalStatus.SUCCESSFUL;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    user.balance += proposal.profit;

    await this.proposalRepository.save(proposal);
    await this.userRepository.save(user);

    return proposal;
  }
}
