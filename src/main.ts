import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const PORT = process.env.Port || 5000;
  const app = await NestFactory.create(AppModule, {cors: true});

  // Настройка сваггера
  const config = new DocumentBuilder()
    .setTitle('brics  ')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('AdiletWD')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  // Глобальный пайп валидации для вывода ошибок при валидации
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log('Server started on port', PORT) );
}
bootstrap();
