import { Image } from '@/types/image'
export interface ApartmentCardProps {
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
    city: string;
    country: string;
    project: string;
    images: Image[];
}