import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../responses/error-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors: string[] = [];

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseObj = exception.getResponse();

            if (typeof responseObj === 'string') {
                message = responseObj;
                errors = [responseObj];
            } else if (typeof responseObj === 'object') {
                const res = responseObj as any;
                message = res.message || message;
                errors = Array.isArray(res.message) ? res.message : res.errors || [message];
            }
        } else if (exception?.message) {
            message = exception.message;
            errors = [exception.message];
        }

        const errorResponse = new ErrorResponse(message, errors);

        response.status(status).json(errorResponse);
    }
}
