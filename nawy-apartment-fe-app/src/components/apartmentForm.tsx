'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createApartment } from '@/services/apartmentService';
import { ApartmentCreateForm } from '@/types/apartmentCreateForm';
import { ImageUploader } from '@/components/imageUploader'
export default function ApartmentForm() {
    const router = useRouter();

    const [form, setForm] = useState<ApartmentCreateForm>({
        name: '',
        title: '',
        description: '',
        price: 0,
        size: 0,
        bedroomsCount: 0,
        bathroomsCount: 0,
        address: '',
        city: '',
        country: '',
        project: '',
        unitNumber: '',
        amenities: [],
        images: [],
    });

    const [amenityInput, setAmenityInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'size' || name.includes('Count') ? Number(value) : value,
        }));
    };

    const handleAddAmenity = () => {
        if (amenityInput && !form.amenities.includes(amenityInput)) {
            setForm((prev) => ({
                ...prev,
                amenities: [...prev.amenities, amenityInput],
            }));
            setAmenityInput('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createApartment(form); // send form data via service
            router.push('/apartments'); // Go back to listing
        } catch (error) {
            console.error('Failed to create apartment:', error);
            alert('Failed to create apartment');
        }
    };
    const handleImageFiles = (files: File[]) => {
        setForm(prev => ({ ...prev, images: files }));
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-6 bg-white rounded shadow">
            <p> Name: </p>
            <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <p> Unit Number: </p>
            <Input name="unitNumber" placeholder="Unit Number" value={form.unitNumber} onChange={handleChange} required />
            <p> Title: </p>
            <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <p> Description: </p>
            <Textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <p> Price: </p>
            <Input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
            <p> Size: </p>
            <Input name="size" type="number" placeholder="Size" value={form.size} onChange={handleChange} required />
            <p> Bedrooms Count: </p>
            <Input name="bedroomsCount" type="number" placeholder="Bedrooms Count" value={form.bedroomsCount} onChange={handleChange} required />
            <p> Bathrooms Count: </p>
            <Input name="bathroomsCount" type="number" placeholder="Bathrooms Count" value={form.bathroomsCount} onChange={handleChange} required />
            <p> Address: </p>
            <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
            <p> City: </p>
            <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <p> Country: </p>
            <Input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
            <p> Project: </p>
            <Input name="project" placeholder="Project" value={form.project} onChange={handleChange} required />
            <p> Amenities: </p>
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

            <ul className="list-disc pl-4">
                {form.amenities.map((a, i) => (
                    <li key={i}>{a}</li>
                ))}
            </ul>

            <ImageUploader onFiles={handleImageFiles} />
            <Button type="submit">Create Apartment</Button>
        </form>
    );
}
