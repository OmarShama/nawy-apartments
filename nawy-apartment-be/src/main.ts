import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './commons/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './config/validation.config';
import { SwaggerModule } from '@nestjs/swagger';
import { buildSwaggerConfig } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Validation pipe
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  // Swagger setup
  const swaggerConfig = buildSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Enable Cors
  app.enableCors();

  // Serve static files from /uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });


  const port = process.env.PORT ?? 3005;
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📘 Swagger docs at http://localhost:${port}/api`);
}
bootstrap();
