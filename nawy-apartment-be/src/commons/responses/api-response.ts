import { ApiProperty } from "@nestjs/swagger";
import { Apartment } from "src/apartments/entities/apartment.entity";

export class ApiResponse<T> {
    @ApiProperty({ example: true })
    success: boolean;
    @ApiProperty()
    message?: string;
    @ApiProperty({ required: false, type: Object })
    data?: Apartment | null;

    constructor(data?: Apartment | null, message?: string, success = true) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
