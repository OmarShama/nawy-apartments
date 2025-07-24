import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Image } from 'src/images/entities/image.entity'

@Entity()
@Unique(['normalizedUnitNumber', 'normalizedProject'])
export class Apartment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ name: 'unit_number' })
    @ApiProperty()
    unitNumber: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    size: number;

    @Column()
    @ApiProperty()
    price: number;

    @Column('text')
    @ApiProperty()
    description: string;

    @Column({ name: 'bedrooms_count' })
    @ApiProperty()
    bedroomsCount: number;

    @Column({ name: 'bathrooms_count' })
    @ApiProperty()
    bathroomsCount: number;

    @Column('text', { array: true })
    @ApiProperty()
    amenities: string[];

    @Column()
    @ApiProperty()
    address: string;

    @Column()
    @ApiProperty()
    city: string;

    @Column()
    @ApiProperty()
    country: string;

    @Column({ nullable: true })
    @ApiProperty()
    latitude: string;

    @Column({ nullable: true })
    @ApiProperty()
    longitude: string;

    @Column()
    @ApiProperty()
    project: string;

    @OneToMany(() => Image, (image) => image.apartment, { cascade: true, eager: true })
    images: Image[];

    @Column({ name: 'normalized_unit_number', select: false })
    normalizedUnitNumber: string;

    @Column({ name: 'normalized_project', select: false })
    normalizedProject: string;

    @BeforeInsert()
    @BeforeUpdate()
    normalizeFields() {
        this.normalizedUnitNumber = Apartment.normalizeText(this.unitNumber);
        this.normalizedProject = Apartment.normalizeText(this.project);
    }

    private static normalizeText(value: string): string {
        return value.trim().replace(/\s+/g, '').toLowerCase();
    }
}
