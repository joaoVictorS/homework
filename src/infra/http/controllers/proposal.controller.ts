// src/infra/http/controllers/proposal.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express'; // Importa a interface Request do express
import { GetPendingProposalsByUserUseCase } from '../../../core/use-cases/proposal/get-pending-proposals-by-user.usecase';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getPendingProposalsByUserUseCase: GetPendingProposalsByUserUseCase,
  ) {}

  @Get()
  async getPendingProposals(@Req() req: Request) {
    const user = req['user']; // O middleware já injeta o usuário na requisição
    return await this.getPendingProposalsByUserUseCase.execute(user.id);
  }
}
