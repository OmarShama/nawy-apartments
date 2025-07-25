import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsOptional, IsPositive } from 'class-validator';

export class CreateApartmentDto {

    @IsString()
    @ApiProperty({ example: 'Apartment Unit Number' })
    unitNumber: string;

    @IsString()
    @ApiProperty({ example: 'Apartment Name' })
    name: string;

    @IsString()
    @ApiProperty({ example: 'Apartment Title' })
    title: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 85 })
    size: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 20000 })
    price: number;

    @IsString()
    @ApiProperty({ example: ' Description' })
    description: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 2 })
    bedroomsCount: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 2 })
    bathroomsCount: number;

    @ApiProperty({ example: ['Amenity one', 'Amenity two'], isArray: true })
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'string') return [value];
        if (Array.isArray(value)) return value;
        return [];
    })
    @IsArray()
    @IsString({ each: true })
    amenities: string[];

    @IsString()
    @ApiProperty({ example: 'Apartment Adress' })
    address: string;

    @IsString()
    @ApiProperty({ example: 'Cairo' })
    city: string;

    @IsString()
    @ApiProperty({ example: 'Egypt' })
    country: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: '30.0444' })
    latitude?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: '30.0444' })
    longitude?: string;

    @IsString()
    @ApiProperty({ example: 'Apartment Name' })
    project: string;
}
