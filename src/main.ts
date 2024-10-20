import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponseInterceptor } from './core/common/interceptors/success-response.interceptor';
import { AllExceptionsFilter } from './core/common/exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Aplicar globalmente o filtro de exceções
  app.useGlobalFilters(new AllExceptionsFilter());

  // Aplicar globalmente o interceptor de formatação de sucesso
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  await app.listen(3005);
}
bootstrap();
