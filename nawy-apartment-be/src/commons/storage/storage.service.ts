export interface StorageService {
    upload(file: Express.Multer.File): Promise<string>; // returns URL
    delete(filePath: string): Promise<void>;
}