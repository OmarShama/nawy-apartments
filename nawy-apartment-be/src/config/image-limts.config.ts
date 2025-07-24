import { FilesInterceptor } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { imageUploadOptions } from './multer.config';
/**
 * ensure env is loaded.
 */
dotenv.config();

/**
 * Check for maximum file limit.
 */
export function createImageInterceptor() {
    const maxImages = parseInt(process.env.MAX_IMAGES || '10', 10);
    return FilesInterceptor('images', maxImages, imageUploadOptions);
}