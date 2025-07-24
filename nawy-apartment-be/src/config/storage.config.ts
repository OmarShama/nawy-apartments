import { LocalStorageService } from "src/commons/storage/local-storage.service";

export const StorageProvider = {
    provide: 'StorageService',
    useClass: LocalStorageService,
};