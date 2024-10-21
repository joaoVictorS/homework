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
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(proposalId: number, userId: number): Promise<any> {
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

    // Retornando a proposta aprovada junto com os dados do usuário e cliente
    return {
      status: 'success',
      data: {
        id: proposal.id,
        profit: proposal.profit,
        status: proposal.status,
        createdAt: proposal.createdAt,
        updatedAt: proposal.updatedAt,
        userCreator: {
          id: user.id,
          name: user.name,
          balance: user.balance, // Retornando o saldo atualizado
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        customer: {
          id: proposal.customer.id,
          name: proposal.customer.name,
          cpf: proposal.customer.cpf,
          createdAt: proposal.customer.createdAt,
          updatedAt: proposal.customer.updatedAt,
        },
      },
      message: 'Operation completed successfully',
    };
  }
}
