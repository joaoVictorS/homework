// src/infra/http/controllers/proposal.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express'; // Importa a interface Request do express
import { GetPendingProposalsByUserUseCase } from '../../../core/use-cases/proposal/get-pending-proposals-by-user.usecase';
import { GetRefusedProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-refused-proposals-by-user.usecase';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getPendingProposalsByUserUseCase: GetPendingProposalsByUserUseCase,
    private readonly getRefusedProposalsByUserUseCase: GetRefusedProposalsByUserUseCase,
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
}
