// src/utils/image-utils.ts
import * as fs from 'fs';
import * as path from 'path';
import { Image } from './entities/image.entity';
import { Apartment } from 'src/apartments/entities/apartment.entity';

export const saveImagesToDiskAndEntities = (
    images: Express.Multer.File[],
    apartment: Apartment,
    host: string,
): Image[] => {
    const uploadDir = './uploads';
    const imagesArray: Image[] = [];

    // write new images in desk
    for (const image of images) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(image.originalname)}`;
        const imagePath = path.join(uploadDir, uniqueName);

        fs.writeFileSync(imagePath, image.buffer);

        // convert images to Image object and link to apartment
        imagesArray.push({
            fileName: uniqueName,
            url: `${host}/uploads/${uniqueName}`,
            apartment,
        } as Image);
    }

    return imagesArray;
};

export const deleteImagesFromDisk = (images: Image[]): void => {
    // remove saved images from disk 
    for (const image of images) {
        const imagePath = path.join('./uploads', image.fileName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
};
