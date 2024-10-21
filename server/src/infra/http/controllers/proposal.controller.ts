import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { GetPendingProposalsByUserUseCase } from '../../../core/use-cases/proposal/get-pending-proposals-by-user.usecase';
import { GetRefusedProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-refused-proposals-by-user.usecase';
import { ApproveProposalUseCase } from 'src/core/use-cases/proposal/approve-proposal.usecase';
import { GetProposalByIdUseCase } from 'src/core/use-cases/proposal/get-proposal-by-id.usecase';
import { CreateProposalUseCase } from 'src/core/use-cases/proposal/create-proposal.usecase';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getPendingProposalsByUserUseCase: GetPendingProposalsByUserUseCase,
    private readonly getRefusedProposalsByUserUseCase: GetRefusedProposalsByUserUseCase,
    private readonly approveProposalUseCase: ApproveProposalUseCase,
    private readonly getProposalByIdUseCase: GetProposalByIdUseCase,
    private readonly createProposalUseCase: CreateProposalUseCase,
  ) {}

  @Get('refused')
  async getRefusedProposals(@Req() req: Request) {
    const user = req['user'];
    return await this.getRefusedProposalsByUserUseCase.execute(user.id);
  }

  @Get(':id')
  async getProposalById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req['user'];

    return await this.getProposalByIdUseCase.execute(id, user.id);
  }

  @Get()
  async getPendingProposals(@Req() req: Request) {
    const user = req['user'];
    return await this.getPendingProposalsByUserUseCase.execute(user.id);
  }

  @Post()
  async createProposal(
    @Req() req: Request,
    @Body() body: { customerId: number; profit: number },
  ) {
    const userId = req['user'].id;
    return await this.createProposalUseCase.execute(
      userId,
      body.customerId,
      body.profit,
    );
  }

  @Post(':proposal_id/approve')
  async approveProposal(
    @Param('proposal_id', ParseIntPipe) proposalId: number,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return await this.approveProposalUseCase.execute(proposalId, user.id);
  }
}
