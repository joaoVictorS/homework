import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from './core/domain/repositories/user.repository';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user-id'];
    if (userId) {
      const user = await this.userRepository.findById(Number(userId));
      if (user) {
        req['user'] = user;
      }
    }
    next();
  }
}
