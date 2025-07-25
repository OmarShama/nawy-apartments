'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FaFilter } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { FilterProps } from '@/types/filterProps';

export default function FilterPanel({ values, onChange, options, onApply, onClear }: FilterProps & {
    onApply: () => void;
    onClear: () => void;
}) {
    const handleChange = (field: keyof FilterProps['values'], value: number) => {
        onChange({ ...values, [field]: value });
    };

    const safeNumber = (v: string | number | undefined, fallback = 0): number => {
        if (typeof v === 'number') return v;
        const parsed = parseFloat(v || '');
        return isNaN(parsed) ? fallback : parsed;
    };

    const maxSize = options.maxSize || 1000;
    const maxPrice = options.maxPrice || 20000;

    return (
        <div className="relative border rounded-md p-4 bg-white shadow space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <FaFilter />
                <span className="text-sm font-medium">Filters</span>
            </div>

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
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>0</span>
                    <span>{maxSize}</span>
                </div>
                <Slider
                    value={[safeNumber(values.minSize), safeNumber(values.maxSize, maxSize)]}
                    min={0}
                    max={maxSize}
                    step={10}
                    onValueChange={([min, max]) => {
                        onChange({
                            ...values,
                            minSize: min,
                            maxSize: max,
                        });
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
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>0</span>
                    <span>{maxPrice}</span>
                </div>
                <Slider
                    value={[safeNumber(values.minPrice), safeNumber(values.maxPrice, maxPrice)]}
                    min={0}
                    max={maxPrice}
                    step={500}
                    onValueChange={([min, max]) => {
                        onChange({
                            ...values,
                            minPrice: min,
                            maxPrice: max,
                        });
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
                    onChange={(e) => onChange({ ...values, city: e.target.value })}
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
                    onChange={(e) => onChange({ ...values, country: e.target.value })}
                >
                    <option value="">Select country</option>
                    {options.countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClear} size="sm">Clear</Button>
                <Button onClick={onApply} size="sm">Apply</Button>
            </div>
        </div>
    );
}