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
    const userId = req.headers['user_id'];

    if (!userId) {
      throw new BadRequestException('O cabeçalho user_id é obrigatório.');
    }

    const user = await this.userRepository.findById(Number(userId));

    if (!user) {
      throw new BadRequestException(
        `Usuário com o ID ${userId} não foi encontrado.`,
      );
    }

    req['user'] = user;
    next();
  }
}
