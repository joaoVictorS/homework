import { Proposal, ProposalStatus } from '../entities/proposal.entity';

export interface IProposalRepository {
  findById(id: number | string): Promise<Proposal>;
  findByUserId(userId: number, status?: ProposalStatus): Promise<Proposal[]>;
  save(proposal: Proposal): Promise<void>;
}
