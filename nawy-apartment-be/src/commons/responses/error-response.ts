
export class ErrorResponse {
    success: false;
    message: string;
    errors: string[];
    data: null;

    constructor(message: string, errors: string[] = []) {
        this.success = false;
        this.message = message;
        this.errors = errors.length ? errors : [message];
        this.data = null;
    }
}