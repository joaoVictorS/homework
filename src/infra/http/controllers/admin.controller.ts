import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { GetProfitByStatusUseCase } from '../../../core/use-cases/proposal/get-profit-by-status.usecase';
import { GetBestUsersByProfitUseCase } from 'src/core/use-cases/proposal/get-best-users-by-profit.usecase';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly getProfitByStatusUseCase: GetProfitByStatusUseCase,
    private readonly getBestUsersByProfitUseCase: GetBestUsersByProfitUseCase,
  ) {}

  @Get('profit-by-status')
  async getProfitByStatus() {
    return await this.getProfitByStatusUseCase.execute();
  }

  @Get('best-users')
  async getBestUsers(@Query('start') start: string, @Query('end') end: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start) || !dateRegex.test(end)) {
      throw new BadRequestException(
        'Formato de data inválido. Use o formato yyyy-mm-dd.',
      );
    }

    return await this.getBestUsersByProfitUseCase.execute(start, end);
  }
}
