'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ApartmentCardProps } from '@/types/apartmentCardProps';



export function ApartmentCard({
    unitNumber,
    name,
    title,
    size,
    price,
    bedroomsCount,
    bathroomsCount,
    city,
    country,
    project,
    images,
}: ApartmentCardProps) {
    const imageUrl = images?.[0]?.url || '';
    console.log(`This is image url ${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`);
    return (
        <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="relative w-full h-48">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{name}</h3>
                <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
                <p className="mt-2 font-bold text-primary">{unitNumber}</p>
                <p className="text-sm text-muted-foreground truncate">{project} • {city}, {country}</p>
                <div className="flex items-center justify-between mt-3 text-sm">
                    <span>{bedroomsCount} 🛏 | {bathroomsCount} 🛁</span>
                    <span>{size} m²</span>
                </div>
                <p className="mt-2 font-bold text-primary">{price} EGP/mo</p>
            </CardContent>
        </Card>
    );
}
