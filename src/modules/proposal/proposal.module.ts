import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../../core/domain/entities/proposal.entity';
import { ProposalController } from '../../infra/http/controllers/proposal.controller';
import { GetProposalByIdUseCase } from '../../core/use-cases/proposal/get-proposal-by-id.usecase';
import { GetProposalsByUserIdUseCase } from '../../core/use-cases/proposal/get-proposals-by-user-id.usecase';
import { TypeOrmProposalRepository } from '../../infra/database/typeorm/proposal.repository';
import { GetPendingProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-pending-proposals-by-user.usecase';
import { GetRefusedProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-refused-proposals-by-user.usecase';
import { ApproveProposalUseCase } from 'src/core/use-cases/proposal/approve-proposal.usecase';
import { UserModule } from '../user/user.module';
import { GetProfitByStatusUseCase } from 'src/core/use-cases/proposal/get-profit-by-status.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal]), forwardRef(() => UserModule)],
  controllers: [ProposalController],
  providers: [
    GetProposalByIdUseCase,
    GetProposalsByUserIdUseCase,
    GetPendingProposalsByUserUseCase,
    GetRefusedProposalsByUserUseCase,
    ApproveProposalUseCase,
    GetProfitByStatusUseCase,
    {
      provide: 'IProposalRepository',
      useClass: TypeOrmProposalRepository,
    },
  ],
  exports: [
    'IProposalRepository',
    GetProposalsByUserIdUseCase,
    GetPendingProposalsByUserUseCase,
    GetRefusedProposalsByUserUseCase,
    ApproveProposalUseCase,
    GetProfitByStatusUseCase,
  ],
})
export class ProposalModule {}
