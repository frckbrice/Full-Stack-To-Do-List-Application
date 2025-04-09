import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  const environment = process.env.NODE_ENV || 'development';
  await app.listen(PORT, async () => {
    console.log(
      `Server running  in ${environment} mode on  ${environment === 'production' ? production_server_url : dev_server_url}`,
    );
  });
}
bootstrap();
