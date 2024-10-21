import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponseInterceptor } from './core/common/interceptors/success-response.interceptor';
import { AllExceptionsFilter } from './core/common/exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: false,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  await app.listen(3005);
}
bootstrap();
