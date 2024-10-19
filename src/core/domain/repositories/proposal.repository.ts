import { Proposal, ProposalStatus } from '../entities/proposal.entity';

export interface IProposalRepository {
  findRefusedByUserId(userId: number): Proposal[] | PromiseLike<Proposal[]>;
  findPendingByUserId(userId: number): Proposal[] | PromiseLike<Proposal[]>;
  findById(id: number | string): Promise<Proposal>;
  findByUserId(userId: number, status?: ProposalStatus): Promise<Proposal[]>;
  getProfitByStatus(): Promise<any>;
  save(proposal: Proposal): Promise<void>;
}
