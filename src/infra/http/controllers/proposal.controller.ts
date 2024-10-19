import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express'; // Importa a interface Request do express
import { GetPendingProposalsByUserUseCase } from '../../../core/use-cases/proposal/get-pending-proposals-by-user.usecase';
import { GetRefusedProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-refused-proposals-by-user.usecase';
import { ApproveProposalUseCase } from 'src/core/use-cases/proposal/approve-proposal.usecase';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getPendingProposalsByUserUseCase: GetPendingProposalsByUserUseCase,
    private readonly getRefusedProposalsByUserUseCase: GetRefusedProposalsByUserUseCase,
    private readonly approveProposalUseCase: ApproveProposalUseCase,
  ) {}

  @Get()
  async getPendingProposals(@Req() req: Request) {
    const user = req['user'];
    return await this.getPendingProposalsByUserUseCase.execute(user.id);
  }

  @Get('refused')
  async getRefusedProposals(@Req() req: Request) {
    const user = req['user'];
    return await this.getRefusedProposalsByUserUseCase.execute(user.id);
  }

  @Post(':proposal_id/approve')
  async approveProposal(
    @Param('proposal_id') proposalId: number,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return await this.approveProposalUseCase.execute(proposalId, user.id);
  }
}
