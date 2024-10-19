import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../../core/domain/entities/proposal.entity';
import { ProposalController } from '../../infra/http/controllers/proposal.controller';
import { GetProposalByIdUseCase } from '../../core/use-cases/proposal/get-proposal-by-id.usecase';
import { GetProposalsByUserIdUseCase } from '../../core/use-cases/proposal/get-proposals-by-user-id.usecase';
import { TypeOrmProposalRepository } from '../../infra/database/typeorm/proposal.repository';
import { GetPendingProposalsByUserUseCase } from 'src/core/use-cases/proposal/get-pending-proposals-by-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal])],
  controllers: [ProposalController],
  providers: [
    GetProposalByIdUseCase,
    GetProposalsByUserIdUseCase,
    GetPendingProposalsByUserUseCase,
    {
      provide: 'IProposalRepository',
      useClass: TypeOrmProposalRepository,
    },
  ],
  exports: [
    'IProposalRepository',
    GetProposalsByUserIdUseCase,
    GetPendingProposalsByUserUseCase,
  ],
})
export class ProposalModule {}
