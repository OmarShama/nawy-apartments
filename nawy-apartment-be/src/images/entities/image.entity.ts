import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Apartment } from "src/apartments/entities/apartment.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    url: string;

    @Column({ name: 'file_name' })
    fileName: string;

    @ManyToOne(() => Apartment, (apartment) => apartment.images, { onDelete: 'CASCADE' })
    apartment: Apartment;
}
