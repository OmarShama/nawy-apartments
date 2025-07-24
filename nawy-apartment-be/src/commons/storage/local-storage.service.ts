import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocalStorageService implements StorageService {
    private readonly uploadPath = path.resolve(__dirname, '../../../uploads');

    async upload(file: Express.Multer.File): Promise<string> {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
        const filename = uuidv4() + path.extname(file.originalname);
        const filePath = path.join(this.uploadPath, filename);
        fs.writeFileSync(filePath, file.buffer);
        return `/uploads/${filename}`;
    }

    async delete(filePath: string): Promise<void> {
        const fullPath = path.join(this.uploadPath, path.basename(filePath));
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }
}
