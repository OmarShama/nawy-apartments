// api-response-apartment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Apartment } from '../../apartments/entities/apartment.entity';

export class ApartmentResponse {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'message' })
    message?: string;

    @ApiProperty({ type: () => Apartment })
    data?: Apartment;
}