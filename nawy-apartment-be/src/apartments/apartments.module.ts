import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { Image } from 'src/images/entities/image.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Apartment, Image])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
})
export class ApartmentsModule { }
