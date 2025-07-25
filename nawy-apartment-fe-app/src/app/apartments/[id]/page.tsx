'use client';
import { getApartmentById } from '@/services/apartmentService';
import { Apartment } from '@/types/apartment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Image as ImageObject } from '@/types/image'
import Image from 'next/image';

export default function ApartmentDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);
    const [apartment, setApartment] = useState<Apartment | null>(null);

    useEffect(() => {
        if (!id || isNaN(id)) return;

        const fetchApartment = async () => {
            try {
                const res = await getApartmentById(id);
                setApartment(res.data);
            } catch (err) {
                console.error('Failed to fetch:', err);
            }
        };

        fetchApartment();
    }, [id]);

    if (!apartment) return <div>Loading...</div>;
    return (

        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{apartment.name}</h1>
            <h3 className="text-2xl font-bold mb-4">{apartment.title}</h3>
            <p className="mb-2">Unit Number: {apartment.unitNumber}</p>
            <p className="mb-2">Project: {apartment.project}</p>
            <p className="mb-2">Size: {apartment.size} sqm</p>
            <p className="mb-2">Price: {apartment.price} EGP</p>
            <p className="mb-2">Address:  {apartment.address}</p>
            <p className="mb-2">Location: {apartment.city}, {apartment.country}</p>
            <p className="mb-2">Bedrooms: {apartment.bedroomsCount}</p>
            <p className="mb-2">Bathrooms: {apartment.bathroomsCount}</p>
            <p className="mb-4">Description: {apartment.description}</p>
            <p className="mb-4">Amenities:</p>
            <div className="grid grid-cols-2 gap-4">
                {apartment.amenities.map((amenity: string, index: number) => (
                    <p key={index} className='mb-4'> {amenity} </p>
                ))}
            </div>
            <p className="mb-4">Images:</p>
            <div className="grid grid-cols-2 gap-4">
                {apartment.images.map((img: ImageObject) => (
                    <Image
                        key={img.id}
                        src={`${process.env.NEXT_PUBLIC_API_URL}${img.url}`}
                        alt="Apartment"
                        width={500}
                        height={300}
                        className="rounded-lg w-full"
                    />
                ))}
            </div>
        </div>
    );
}
