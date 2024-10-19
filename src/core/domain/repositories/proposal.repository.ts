import { Proposal, ProposalStatus } from '../entities/proposal.entity';

export interface IProposalRepository {
  findPendingByUserId(userId: number): Proposal[] | PromiseLike<Proposal[]>;
  findById(id: number | string): Promise<Proposal>;
  findByUserId(userId: number, status?: ProposalStatus): Promise<Proposal[]>;
  save(proposal: Proposal): Promise<void>;
}
