import { Image } from '@/types/image'

/*
 *
 * Apartment Model for fetching data
 * 
 */

export interface Apartment {
    id: number;
    unitNumber: string;
    name: string;
    title: string;
    size: number;
    price: number;
    description: string;
    bedroomsCount: number;
    bathroomsCount: number;
    amenities: string[];
    address: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    project: string;
    images: Image[];
}