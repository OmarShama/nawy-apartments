'use client';

import { SortProps } from '@/types/sortProps';
import { useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';



const options = [
    { value: 'price', label: 'Price' },
    { value: 'size', label: 'Size' },
    { value: 'bedroomsCount', label: 'Bedrooms Count' },
    { value: 'bathroomsCount', label: 'Bathrooms Count' },
];

export default function SortPanel({ values, onChange }: SortProps) {
    const [open, setOpen] = useState(false);

    const handleSortChange = (field: string) => {
        const newOrder = values.sortBy === field && values.order === 'DESC' ? 'DESC' : 'ASC';
        onChange(field, newOrder);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)}>
                <FaSortAmountDown className="text-xl" />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md z-20 w-48 border">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${values.sortBy === opt.value ? 'font-bold' : ''}`}
                            onClick={() => handleSortChange(opt.value)}
                        >
                            {opt.label} ({values.sortBy === opt.value ? values.order : 'ASC'})
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}