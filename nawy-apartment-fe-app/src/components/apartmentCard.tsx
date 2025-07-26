'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ApartmentCardProps } from '@/types/apartmentCardProps';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteApartment } from '@/services/apartmentService';


export function ApartmentCard({
    id,
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
    onDeleteSuccess,
}: ApartmentCardProps) {
    const handleDelete = async () => {
        try {
            await deleteApartment(id);
            alert('Deleted successfully');
            onDeleteSuccess?.();
        } catch {
            alert('Error deleting apartment');
        }
    };

    const imageUrl = images?.[0]?.url || '';
    console.log(`This is image url ${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`);
    const formatNumber = (num: number) => num.toLocaleString();
    return (
        <Card className="relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
                {/* Edit Button */}
                <button
                    className="p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                >
                    <Pencil size={16} className="text-gray-600" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete();
                    }}
                    className="p-1 bg-red-100 rounded-full shadow hover:bg-red-200 transition"
                >
                    <Trash2 size={16} className="text-red-600" />
                </button>
            </div>
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
                <p className="mt-2 font-bold text-primary">{formatNumber(price)} EGP</p>
            </CardContent>
        </Card>
    );
}
