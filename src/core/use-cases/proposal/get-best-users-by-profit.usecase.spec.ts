import { GetBestUsersByProfitUseCase } from './get-best-users-by-profit.usecase';
import { IProposalRepository } from '../../../core/domain/repositories/proposal.repository';

describe('GetBestUsersByProfitUseCase', () => {
  let useCase: GetBestUsersByProfitUseCase;
  let proposalRepository: IProposalRepository;

  beforeEach(() => {
    proposalRepository = {
      getBestUsersByProfit: jest.fn(),
    } as unknown as IProposalRepository;
    useCase = new GetBestUsersByProfitUseCase(proposalRepository);
  });

  it('deve retornar os usuários com maior profit no período', async () => {
    const mockResult = [
      { userId: 1, totalProfit: 500 },
      { userId: 2, totalProfit: 300 },
    ];

    jest
      .spyOn(proposalRepository, 'getBestUsersByProfit')
      .mockResolvedValue(mockResult);

    const result = await useCase.execute('2024-01-01', '2024-12-31');

    expect(result).toEqual(mockResult);
    expect(proposalRepository.getBestUsersByProfit).toHaveBeenCalledWith(
      '2024-01-01',
      '2024-12-31',
    );
  });
});
