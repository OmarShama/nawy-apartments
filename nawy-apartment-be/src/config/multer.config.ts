import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import * as multer from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';


/**
 * Allowed MIME types for image upload.
 */
const allowedMimeTypes = ['image/jpeg', 'image/png'];

/**
 * File filter to allow only JPG and PNG.
 */
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
            new BadRequestException('Only .jpg, .jpeg, and .png files are allowed!'),
            false
        );
    }
    cb(null, true);
};

/**
 * Multer options — no per-file limit.
 */
export const imageUploadOptions = {
    storage: multer.memoryStorage(),
    fileFilter, // No size limit here
};



/**
 * Validate total combined size of uploaded files.
 */
export function validateTotalUploadSize(
    files: Express.Multer.File[],
    maxBytes: number = 5 * 1024 * 1024
) {
    if (!files || !Array.isArray(files)) {
        return;
    }
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > maxBytes) {
        throw new BadRequestException(`Total uploaded images must not exceed ${maxBytes / 1024 / 1024}MB`);
    }
}
