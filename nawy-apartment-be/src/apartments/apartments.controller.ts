import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApiResponse } from 'src/commons/responses/api-response';
import { PaginatedResponse } from 'src/commons/responses/paginated-response';
import { ApartmentFilterDto } from './dto/apartment-filter.dto';
import { ApiBody, ApiExtraModels, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { Apartment } from './entities/apartment.entity';
import { ApartmentResponse } from 'src/commons/responses/api-response-apartment.dto';
import { validateTotalUploadSize } from 'src/config/multer.config';
import { createImageInterceptor } from 'src/config/image-limts.config';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) { }
  @UseInterceptors(createImageInterceptor())
  @Post()
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiBody({ type: CreateApartmentDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Apartments created successfully',
    type: ApartmentResponse,
  })
  async create(@Body() dto: CreateApartmentDto, @UploadedFiles() images: Express.Multer.File[]) {
    validateTotalUploadSize(images);
    const apartment = await this.apartmentsService.create(dto, images);
    return new ApiResponse(apartment, 'Apartment created successfully');
  }


  @Get()
  @ApiOperation({ summary: 'List apartments with filters' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Apartments retrieved successfully',
    type: ApartmentResponse,
  })
  async findAll(@Query() filters: ApartmentFilterDto) {
    const { data, total } = await this.apartmentsService.findAll(filters);

    return new PaginatedResponse(
      data,
      total,
      'Apartments retrieved successfully'
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @SwaggerApiResponse({
    status: 200,
    description: 'Apartment details retrieved successfully',
    type: ApartmentResponse,
  })
  async findOne(@Param('id') id: string) {
    const apartment = await this.apartmentsService.findOne(+id);
    return new ApiResponse(apartment, 'Apartment details retrieved successfully');
  }



  @ApiExtraModels(ApiResponse, Apartment)
  @Patch(':id')

  @UseInterceptors(createImageInterceptor())
  @ApiOperation({ summary: 'Update apartment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateApartmentDto })
  @SwaggerApiResponse({
    status: 200,
    description: 'Apartment updated successfully',
    type: ApartmentResponse, // 👈 This will show full object
  })
  async update(@Param('id') id: string, @Body() dto: UpdateApartmentDto, @UploadedFiles() images: Express.Multer.File[]) {
    const updated = await this.apartmentsService.update(+id, dto, images);
    return new ApiResponse(updated, 'Apartment updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete apartment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @SwaggerApiResponse({
    status: 200,
    description: 'Apartment deleted successfully',
    type: ApiResponse,
  })
  async remove(@Param('id') id: string) {
    await this.apartmentsService.remove(+id);
    return new ApiResponse(null, 'Apartment deleted successfully');
  }
}
