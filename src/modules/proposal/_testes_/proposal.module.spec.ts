import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proposal, ProposalStatus } from '../../../core/domain/entities/proposal.entity';
import { Repository } from 'typeorm';

describe('ProposalRepository', () => {
  let proposalRepository: Repository<Proposal>;

  const mockProposalRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([]),
      getMany: jest.fn().mockResolvedValue([]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Proposal),
          useValue: mockProposalRepository, // Mockando o repositório de Proposal
        },
      ],
    }).compile();

    proposalRepository = module.get<Repository<Proposal>>(
      getRepositoryToken(Proposal),
    );
  });

  it('should be defined', () => {
    expect(proposalRepository).toBeDefined();
  });

  it('deve chamar find no repository', async () => {
    const mockResult = [
      {
        id: 1,
        profit: 100,
        status: ProposalStatus.PENDING,
        userCreator: {
          id: 1,
          name: 'John Doe',
          createdCustomers: [],
          proposals: [],
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        customer: {
          id: 1,
          name: 'ACME Corp',
          userCreator: {
            id: 1,
            name: 'John Doe',
            createdCustomers: [],
            proposals: [],
            balance: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          proposals: [],
          cpf: '12345678900',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(proposalRepository, 'find').mockResolvedValue(mockResult);

    const result = await proposalRepository.find();
    expect(result).toEqual(mockResult);
    expect(proposalRepository.find).toHaveBeenCalled();
  });
});
