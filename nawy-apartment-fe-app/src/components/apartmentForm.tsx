'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createApartment } from '@/services/apartmentService';
import { ImageUploader } from '@/components/imageUploader';
import { useEffect, useState } from 'react';
import { apartmentSchema } from '@/types/apartmentSchema';
import { X } from 'lucide-react';
type ApartmentFormType = z.infer<typeof apartmentSchema>;
export default function ApartmentForm() {
    const router = useRouter();
    const [amenityInput, setAmenityInput] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ApartmentFormType>({
        resolver: zodResolver(apartmentSchema),
        defaultValues: {
            name: '',
            title: '',
            description: '',
            unitNumber: '',
            price: 0,
            size: 0,
            bedroomsCount: 0,
            bathroomsCount: 0,
            address: '',
            city: '',
            country: '',
            project: '',
            amenities: [],
            images: [],
        },
    });

    const amenities = watch('amenities') || [];

    const onSubmit = async (data: ApartmentFormType) => {
        const finalData = {
            ...data,
            amenities: data.amenities || [],
            images: data.images || [],
        };

        try {
            await createApartment(finalData);
            router.push('/apartments');
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };

    const handleAddAmenity = () => {
        if (amenityInput && /^[A-Za-z\s]+$/.test(amenityInput) && !amenities.includes(amenityInput)) {
            setValue('amenities', [...amenities, amenityInput]);
            setAmenityInput('');
        }
    };

    const [images, setImages] = useState<File[]>([]);

    const handleImageFiles = (newFiles: File[]) => {
        const updated = [...images, ...newFiles].filter(
            (file, index, self) =>
                index === self.findIndex(f => f.name === file.name && f.size === file.size)
        );

        setImages(updated);
        setValue('images', updated);
    };
    const handleRemoveImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setValue('images', updated);
    };
    useEffect(() => {
        console.log('Parent images state:', images);
    }, [images]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-4 p-6 bg-white rounded shadow">
            {[
                { label: 'Name', name: 'name' },
                { label: 'Unit Number', name: 'unitNumber' },
                { label: 'Title', name: 'title' },
                { label: 'Description', name: 'description', component: Textarea },
                { label: 'Price', name: 'price', type: 'number' },
                { label: 'Size', name: 'size', type: 'number' },
                { label: 'Bedrooms Count', name: 'bedroomsCount', type: 'number' },
                { label: 'Bathrooms Count', name: 'bathroomsCount', type: 'number' },
                { label: 'Address', name: 'address' },
                { label: 'City', name: 'city' },
                { label: 'Country', name: 'country' },
                { label: 'Project', name: 'project' },
            ].map(({ label, name, component, type }) => {
                const Comp = component || Input;
                return (
                    <div key={name}>
                        <p>{label}:</p>
                        <Comp
                            type={type}
                            {...register(name as keyof ApartmentFormType)}
                        />
                        {errors[name as keyof ApartmentFormType] && (
                            <p className="text-red-500 text-sm">
                                {errors[name as keyof ApartmentFormType]?.message?.toString()}
                            </p>
                        )}
                    </div>
                );
            })}

            <p>Amenities:</p>
            <div className="flex gap-2">
                <Input
                    placeholder="Add Amenity"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                />
                <Button type="button" onClick={handleAddAmenity}>
                    Add
                </Button>
            </div>
            {errors.amenities && <p className="text-red-500 text-sm">{errors.amenities.message?.toString()}</p>}

            <ul className="list-disc pl-4 space-y-1">
                {amenities.map((a, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <span>{a}</span>
                        <button
                            type="button"
                            onClick={() => {
                                const updated = [...amenities];
                                updated.splice(i, 1);
                                setValue('amenities', updated);
                            }}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove ${a}`}
                        >
                            <X size={16} />
                        </button>
                    </li>
                ))}
            </ul>

            <ImageUploader files={images} onFiles={handleImageFiles} onRemove={handleRemoveImage} />

            <Button type="submit">Create Apartment</Button>
        </form>
    );
}

