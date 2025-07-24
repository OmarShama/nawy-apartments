import { DocumentBuilder } from '@nestjs/swagger';

export function buildSwaggerConfig() {
    return new DocumentBuilder()
        .setTitle('Nawy Apartments API')
        .setDescription('Endpoints for managing apartment listings')
        .setVersion('1.0')
        .addTag('apartments')
        .build();
}
