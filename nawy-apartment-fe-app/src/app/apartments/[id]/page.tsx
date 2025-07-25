'use client';

import { getApartmentById } from '@/services/apartmentService';
import { Apartment } from '@/types/apartment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

export default function ApartmentDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);
    const [apartment, setApartment] = useState<Apartment | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

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

    useEffect(() => {
        const interval = setInterval(() => {
            if (apartment && apartment.images.length > 0) {
                setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [apartment]);

    const formatNumber = (num: number) => num.toLocaleString();

    if (!apartment) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">


                {apartment.images.length > 0 && (
                    <div className="flex justify-center mb-6">
                        <div className="relative w-full max-w-4xl h-[400px] cursor-pointer" onClick={() => {
                            setSelectedImage(`${process.env.NEXT_PUBLIC_API_URL}${apartment.images[currentImageIndex].url}`);
                            setShowModal(true);
                        }}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}${apartment.images[currentImageIndex].url}`}
                                alt="Apartment Preview"
                                fill
                                className="rounded-lg w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                )}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{apartment.name}</h1>
                        <h2 className="text-xl font-semibold mb-4">{apartment.title}</h2>
                        <p className="mb-1">Unit Number: {apartment.unitNumber}</p>
                        <p className="mb-1">Project: {apartment.project}</p>
                        <p className="mb-1">Size: {formatNumber(apartment.size)} m²</p>
                        <p className="mb-1">Price: {formatNumber(apartment.price)} EGP</p>
                        <p className="mb-1">Address: {apartment.address}</p>
                        <p className="mb-1">Location: {apartment.city}, {apartment.country}</p>
                    </div>
                    <div>
                        <p className="mb-1">🛏 Bedrooms: {apartment.bedroomsCount}</p>
                        <p className="mb-1">🛁 Bathrooms: {apartment.bathroomsCount}</p>
                        <p className="mb-4">Description: {apartment.description}</p>
                        <div className="mb-4">
                            <p className="font-medium">Amenities:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {apartment.amenities.map((amenity: string, index: number) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 px-3 py-1 rounded-full text-sm border"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                        <div className="relative bg-white rounded-lg max-w-5xl w-full p-4 flex gap-4">

                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
                                aria-label="Close"
                            >
                                <X size="14" />
                            </button>

                            {/* Main Image */}
                            <div className="flex-1 flex items-center justify-center">
                                <div className="relative w-[800px] h-[500px]">
                                    <Image
                                        src={selectedImage}
                                        alt="Selected"
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="w-32 space-y-2 overflow-y-auto">
                                {apartment.images.map((img) => {
                                    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${img.url}`;
                                    const isSelected = selectedImage === imageUrl;
                                    return (
                                        <div
                                            key={img.id}
                                            className={`relative w-full h-[60px] rounded-lg border-2 cursor-pointer ${isSelected ? 'border-blue-500 shadow-md' : 'border-transparent'
                                                }`}
                                            onClick={() => setSelectedImage(imageUrl)}
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt="Thumbnail"
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>
        </div>
    );
}
