export class PaginatedResponse<T> {
    success: boolean;
    message?: string;
    data: T[];
    total: number;
    limit: number;
    offset: number;

    constructor(data: T[], total: number, message?: string, success = true,) {
        this.success = success;
        this.data = data;
        this.total = total;
        this.message = message;
    }
}
