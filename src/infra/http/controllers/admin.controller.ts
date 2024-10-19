import { Controller, Get } from '@nestjs/common';
import { GetProfitByStatusUseCase } from '../../../core/use-cases/proposal/get-profit-by-status.usecase';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly getProfitByStatusUseCase: GetProfitByStatusUseCase,
  ) {}

  @Get('profit-by-status')
  async getProfitByStatus() {
    return await this.getProfitByStatusUseCase.execute();
  }
}
