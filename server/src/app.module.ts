import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configs/ormconfig';
import { UserModule } from './modules/user/user.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { UserMiddleware } from './get-user-middleware';
import { AdminController } from './infra/http/controllers/admin.controller';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ProposalModule,
    CustomerModule,
  ],
  controllers: [AdminController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*'); // Apply it for all routes or specify routes
  }
}
