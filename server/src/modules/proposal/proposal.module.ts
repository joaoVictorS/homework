import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../../core/domain/entities/proposal.entity';
import { ProposalController } from '../../infra/http/controllers/proposal.controller';
import { GetProposalByIdUseCase } from '../../core/use-cases/proposal/get-proposal-by-id.usecase';
import { GetProposalsByUserIdUseCase } from '../../core/use-cases/proposal/get-proposals-by-user-id.usecase';
import { TypeOrmProposalRepository } from '../../infra/database/typeorm/proposal.repository';
import { GetPendingProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-pending-proposals-by-user.usecase';
import { GetRefusedProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-refused-proposals-by-user.usecase';
import { ApproveProposalUseCase } from 'src/core/use-cases/proposal/approve-proposal.usecase';
import { GetProfitByStatusUseCase } from 'src/core/use-cases/proposal/get-profit-by-status.usecase';
import { GetBestUsersByProfitUseCase } from 'src/core/use-cases/proposal/get-best-users-by-profit.usecase';
import { CreateProposalUseCase } from 'src/core/use-cases/proposal/create-proposal.usecase';
import { User } from 'src/core/domain/entities/user.entity';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal, User]),
    CustomerModule,
    UserModule,
  ],
  controllers: [ProposalController],
  providers: [
    GetProposalByIdUseCase,
    GetProposalsByUserIdUseCase,
    GetPendingProposalsByUserUseCase,
    GetRefusedProposalsByUserUseCase,
    ApproveProposalUseCase,
    GetProfitByStatusUseCase,
    GetBestUsersByProfitUseCase,
    CreateProposalUseCase,
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
    GetBestUsersByProfitUseCase,
    CreateProposalUseCase,
  ],
})
export class ProposalModule {}
