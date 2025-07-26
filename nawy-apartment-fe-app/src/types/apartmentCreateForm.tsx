/*
 *
 * Apartment Create Model
 *  For saving apartments data and sending to Api
 */

export interface ApartmentCreateForm {
    name: string;
    title: string;
    description: string;
    price: number;
    size: number;
    bedroomsCount: number;
    bathroomsCount: number;
    address: string;
    city: string;
    country: string;
    project: string;
    unitNumber: string;
    amenities: string[];
    latitude?: string;
    longitude?: string;
    images: File[];
}
