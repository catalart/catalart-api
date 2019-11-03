import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { UnknownExceptionFilter } from '@api/filters/unknown-exception.filter';
import { CatalartExceptionFilter } from '@api/filters/catalart-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new CatalartExceptionFilter());
  app.useGlobalFilters(new UnknownExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Catalart API Documentation')
    .setDescription('The api documentation for Catalart')
    .setVersion('1.0')
    .addTag('catalart')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
