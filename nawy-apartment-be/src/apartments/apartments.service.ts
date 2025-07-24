import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApartmentFilterDto } from './dto/apartment-filter.dto';
import { Image } from 'src/images/entities/image.entity'
import * as fs from 'fs';
import * as path from 'path';
import { bool } from 'aws-sdk/clients/signer';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentRepo: Repository<Apartment>,

    @InjectRepository(Image)
    private imageRepo: Repository<Image>,
  ) { }

  // create apartment
  async create(dto: CreateApartmentDto, images: Express.Multer.File[]): Promise<Apartment> {
    try {

      const exists = await this.checkExistence(dto);
      if (exists === true) {
        throw new BadRequestException(`${dto.unitNumber} already exists in ${dto.project} project`);
      }
      const apartment = this.apartmentRepo.create(dto);
      const savedApartment = await this.apartmentRepo.save(apartment);

      // Check images lenght and create them
      if (images?.length) {
        const imageEntities = await this.saveImagesToDiskAndCreateEntities(images, savedApartment);
        await this.imageRepo.save(imageEntities);
      }

      // Re-fetch it to include images
      const apartmentWithImages = await this.apartmentRepo.findOne({
        where: { id: savedApartment.id },
        relations: ['images']
      });

      if (!apartmentWithImages) {
        throw new NotFoundException('Apartment not found after creation');
      }
      return apartmentWithImages;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create apartment');
    }
  }

  // get all apartments list with filteration and search
  async findAll(filters: ApartmentFilterDto): Promise<{ data: Apartment[]; total: number }> {
    try {
      // create query
      const query = this.apartmentRepo.createQueryBuilder('apartment');
      // build query filters
      this.buildFilterQuery(query, filters);

      const limit = parseInt(filters.limit ?? '10', 10);
      const offset = parseInt(filters.offset ?? '0', 10);

      query.skip(offset).take(limit);

      // excute query and get list
      const [data, total] = await query.getManyAndCount();

      return { data, total };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create apartment');
    }
  }

  // Get apartment details by id
  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentRepo.findOne({ where: { id } });
    if (!apartment) throw new NotFoundException('Apartment not found');
    return apartment;
  }

  // Update apartment by id
  async update(id: number, dto: UpdateApartmentDto, images: Express.Multer.File[]): Promise<Apartment> {
    try {
      const apartment = await this.apartmentRepo.findOne({
        where: { id },
        relations: ['images'],
      });

      if (!apartment) {
        throw new BadRequestException('Apartment not found');
      }

      // Update apartment fields
      const updated = Object.assign(apartment, dto);
      const savedApartment = await this.apartmentRepo.save(updated);

      // Only handle image logic if new images are sent
      if (images?.length) {

        // Delete apartment old images
        await this.deleteApartmentImages(apartment);

        // Create and save new images sent in request
        const imageEntities = await this.saveImagesToDiskAndCreateEntities(images, savedApartment);
        await this.imageRepo.save(imageEntities);
      }

      // Re-fetch apartment with images to return
      const finalResult = await this.apartmentRepo.findOne({
        where: { id: savedApartment.id },
        relations: ['images'],
      });

      if (!finalResult) throw new NotFoundException('Apartment not found after update');

      return finalResult;

    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update apartment');
    }
  }

  // delete apartment by id
  async remove(id: number): Promise<void> {
    const result = await this.apartmentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Apartment not found');
  }

  // Method to build query from filters
  private buildFilterQuery(query: SelectQueryBuilder<Apartment>, filters: ApartmentFilterDto): void {
    // Get apartment images
    query.leftJoinAndSelect('apartment.images', 'images');

    // Filtering
    if (filters.name) query.andWhere('apartment.name ILIKE :name', { name: `%${filters.name}%` });
    if (filters.city) query.andWhere('apartment.city = :city', { city: filters.city });
    if (filters.country) query.andWhere('apartment.country = :country', { country: filters.country });
    if (filters.project) query.andWhere('apartment.project = :project', { project: filters.project });
    if (filters.unitNumber) query.andWhere('apartment.unitNumber = :unitNumber', { unitNumber: filters.unitNumber });
    //Exact match or range for size
    if (filters.size) query.andWhere('apartment.size = :size', { size: +filters.size });
    if (filters.minSize) query.andWhere('apartment.size >= :minSize', { minSize: +filters.minSize });
    if (filters.maxSize) query.andWhere('apartment.size <= :maxSize', { maxSize: +filters.maxSize });
    // Exact match or range for price
    if (filters.price) query.andWhere('apartment.price = :price', { price: +filters.price });
    if (filters.minPrice) query.andWhere('apartment.price >= :minPrice', { minPrice: +filters.minPrice });
    if (filters.maxPrice) query.andWhere('apartment.price <= :maxPrice', { maxPrice: +filters.maxPrice });
    // Bedroom and Bathroom filtering
    if (filters.bedroomsCount) query.andWhere('apartment.bedroomsCount = :bedroomsCount', { bedroomsCount: +filters.bedroomsCount });
    if (filters.bathroomsCount) query.andWhere('apartment.bathroomsCount = :bathroomsCount', { bathroomsCount: +filters.bathroomsCount });

    // Sorting
    const sortableFields = [
      'size',
      'price',
      'bedroomsCount',
      'bathroomsCount',
    ];

    const sortBy = filters.sortBy;
    const order = filters.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // default: ASC

    if (sortBy && sortableFields.includes(sortBy)) {
      query.orderBy(`apartment.${sortBy}`, order);
    }

  }

  // Save images in disk and model
  private async saveImagesToDiskAndCreateEntities(
    images: Express.Multer.File[],
    apartment: Apartment,
  ): Promise<Image[]> {
    const host = process.env.HOST || 'http://localhost:3000';
    const uploadDir = './uploads';
    const imageEntities: Image[] = [];

    for (const image of images) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(image.originalname)}`;
      const filePath = path.join(uploadDir, uniqueName);

      // Save image in storage
      fs.writeFileSync(filePath, image.buffer);

      // Convert image file to image entity
      const newImage = this.imageRepo.create({
        fileName: uniqueName,
        url: `${host}/uploads/${uniqueName}`,
        apartment,
      });

      imageEntities.push(newImage);
    }

    return imageEntities;
  }

  // Delete old images when updated
  private async deleteApartmentImages(apartment: Apartment): Promise<void> {
    for (const img of apartment.images) {
      const filePath = path.join('./uploads', img.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await this.imageRepo.remove(apartment.images);
  }

  // 
  private async checkExistence(dto: CreateApartmentDto): Promise<boolean> {
    const normalizedUnit = dto.unitNumber.trim().replace(/\s+/g, '').toLowerCase();
    const normalizedProject = dto.project.trim().replace(/\s+/g, '').toLowerCase();

    const existing = await this.apartmentRepo.findOne({
      where: {
        normalizedUnitNumber: normalizedUnit,
        normalizedProject: normalizedProject,
      },
    });
    const exists = existing ? true : false;
    return exists;
  }
}
