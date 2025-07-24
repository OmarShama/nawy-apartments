'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FaFilter } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { FilterProps } from '@/types/filterProps';

export default function FilterPanel({ values, onChange, options }: FilterProps) {
    const [open, setOpen] = useState(false);

    const handleChange = (field: keyof FilterProps['values'], value: string | number) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="relative">
            <Button variant="outline" onClick={() => setOpen(!open)}>
                <FaFilter className="mr-2" />
            </Button>

            {open && (
                <div className="absolute top-full mt-2 bg-white p-4 border rounded shadow-md z-10 w-80 space-y-4">

                    <div>
                        <label className="block mb-1 text-sm font-medium">Size (Fixed)</label>
                        <Input
                            type="number"
                            placeholder="Size e.g. 100"
                            value={values.size || ''}
                            onChange={(e) => handleChange('size', Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Size (Range)</label>
                        <Slider
                            defaultValue={[Number(values.minSize) || 0, Number(values.maxSize) || 1000]}
                            min={0}
                            max={1000}
                            step={10}
                            onValueChange={([min, max]) => {
                                handleChange('minSize', min);
                                handleChange('maxSize', max);
                            }}
                            className="mb-2"
                        />
                        <div className="flex gap-2 items-center">
                            <Input
                                type="number"
                                placeholder="Min Size"
                                value={values.minSize || ''}
                                onChange={(e) => handleChange('minSize', Number(e.target.value))}
                            />
                            <span>-</span>
                            <Input
                                type="number"
                                placeholder="Max Size"
                                value={values.maxSize || ''}
                                onChange={(e) => handleChange('maxSize', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Price (Fixed)</label>
                        <Input
                            type="number"
                            placeholder="e.g. 5000"
                            value={values.price || ''}
                            onChange={(e) => handleChange('price', Number(e.target.value))}
                        />
                    </div>


                    <div>
                        <label className="block mb-1 text-sm font-medium">Price (Range)</label>
                        <Slider
                            defaultValue={[Number(values.minPrice) || 0, Number(values.maxPrice) || 20000]}
                            min={0}
                            max={20000}
                            step={500}
                            onValueChange={([min, max]) => {
                                handleChange('minPrice', min);
                                handleChange('maxPrice', max);
                            }}
                            className="mb-2"
                        />
                        <div className="flex gap-2 items-center">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={values.minPrice || ''}
                                onChange={(e) => handleChange('minPrice', Number(e.target.value))}
                            />
                            <span>-</span>
                            <Input
                                type="number"
                                placeholder="Max"
                                value={values.maxPrice || ''}
                                onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
                            />
                        </div>
                    </div>


                    <div>
                        <label className="block mb-1 text-sm font-medium">Bathrooms Count</label>
                        <Input
                            type="number"
                            value={values.bathroomsCount || ''}
                            onChange={(e) => handleChange('bathroomsCount', Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Bedrooms Count</label>
                        <Input
                            type="number"
                            value={values.bedroomsCount || ''}
                            onChange={(e) => handleChange('bedroomsCount', Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">City</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={values.city || ''}
                            onChange={(e) => handleChange('city', e.target.value)}
                        >
                            <option value="">Select city</option>
                            {options.cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Country</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={values.country || ''}
                            onChange={(e) => handleChange('country', e.target.value)}
                        >
                            <option value="">Select country</option>
                            {options.countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}