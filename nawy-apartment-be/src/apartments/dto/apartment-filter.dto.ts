import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class ApartmentFilterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    project?: string;

    @IsOptional()
    @IsString()
    unitNumber?: string;

    // Size range
    @IsOptional()
    @IsNumberString()
    size?: string;

    @IsOptional()
    @IsNumberString()
    minSize?: string;

    @IsOptional()
    @IsNumberString()
    maxSize?: string;

    // Price range
    @IsOptional()
    @IsNumberString()
    price?: string;

    @IsOptional()
    @IsNumberString()
    minPrice?: string;

    @IsOptional()
    @IsNumberString()
    maxPrice?: string;

    // Bedrooms / Bathrooms
    @IsOptional()
    @IsNumberString()
    bedroomsCount?: string;

    @IsOptional()
    @IsNumberString()
    bathroomsCount?: string;

    // Pagination fields
    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsNumberString()
    offset?: string;

    // Sorting fields
    @IsOptional()
    @IsString()
    @IsIn(['price', 'size', 'bedroomsCount', 'bathroomsCount'])
    sortBy?: string;

    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    order?: string;
}
