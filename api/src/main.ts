import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 5000;
const dev_server_url = `${process.env.LOCAL_API_URL} `;
const production_server_url = `${process.env.PROD_API_URL} `;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const environment = process.env.NODE_ENV || 'development';
  await app.listen(PORT, async () => {
    console.log(
      `Server running  in ${environment} mode on  ${environment === 'production' ? production_server_url : dev_server_url}`,
    );
  });
}
bootstrap();
