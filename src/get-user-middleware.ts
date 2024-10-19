import {
  Injectable,
  NestMiddleware,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from './core/domain/repositories/user.repository';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('UserMiddleware: Executando middleware...');

    const userId = req.headers['user_id']; // Certifique-se de capturar o cabeçalho correto

    // Lança uma exceção se o cabeçalho `user_id` não estiver presente
    if (!userId) {
      throw new BadRequestException('O cabeçalho user_id é obrigatório.');
    }

    const user = await this.userRepository.findById(Number(userId));

    // Lança uma exceção se o usuário não for encontrado
    if (!user) {
      throw new BadRequestException(
        `Usuário com o ID ${userId} não foi encontrado.`,
      );
    }

    // Atribui o usuário à requisição se encontrado
    req['user'] = user;
    console.log('UserMiddleware: Usuário encontrado e atribuído à requisição');
    next();
  }
}
