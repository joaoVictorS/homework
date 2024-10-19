import { Controller, Get, Param } from '@nestjs/common';
import { GetProposalByIdUseCase } from '../../../core/use-cases/proposal/get-proposal-by-id.usecase';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getProposalByIdUseCase: GetProposalByIdUseCase,
  ) {}

  @Get(':id')
  async getProposalById(@Param('id') id: number) {
    return await this.getProposalByIdUseCase.execute(id);
  }
}
