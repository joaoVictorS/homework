import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GetProfitByStatusUseCase } from '../../../core/use-cases/proposal/get-profit-by-status.usecase';
import { GetBestUsersByProfitUseCase } from '../../../core/use-cases/proposal/get-best-users-by-profit.usecase';
import { AdminController } from './admin.controller';

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let getBestUsersByProfitUseCase: GetBestUsersByProfitUseCase;
  let getProfitByStatusUseCase: GetProfitByStatusUseCase;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: GetBestUsersByProfitUseCase,
          useValue: {
            execute: jest.fn(), // Mock do caso de uso GetBestUsersByProfitUseCase
          },
        },
        {
          provide: GetProfitByStatusUseCase,
          useValue: {
            execute: jest.fn(), // Mock do caso de uso GetProfitByStatusUseCase
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    getBestUsersByProfitUseCase =
      moduleFixture.get<GetBestUsersByProfitUseCase>(
        GetBestUsersByProfitUseCase,
      );
    getProfitByStatusUseCase = moduleFixture.get<GetProfitByStatusUseCase>(
      GetProfitByStatusUseCase,
    );

    await app.init();
  });

  it('GET /admin/best-users (GET)', async () => {
    const mockResult = [
      { userId: 1, totalProfit: 1000 },
      { userId: 2, totalProfit: 800 },
    ];

    // Mockando o retorno do caso de uso
    jest
      .spyOn(getBestUsersByProfitUseCase, 'execute')
      .mockResolvedValue(mockResult);

    const response = await request(app.getHttpServer())
      .get('/admin/best-users?start=2024-01-01&end=2024-12-31')
      .expect(200);

    expect(response.body).toEqual(mockResult);
    expect(getBestUsersByProfitUseCase.execute).toHaveBeenCalledWith(
      '2024-01-01',
      '2024-12-31',
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
