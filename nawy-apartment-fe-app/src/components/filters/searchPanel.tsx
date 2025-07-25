'use client';

import { SearchProps } from '@/types/searchProps';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function SearchPanel({ values, onChange, onApply, onClear }: SearchProps & {
    onApply: () => void;
    onClear: () => void;
}) {
    return (
        <div className="p-4 border rounded-md w-full bg-white shadow space-y-2">
            <div className="flex items-center mb-2 text-muted-foreground gap-2">
                <FaSearch />
                <span className="text-sm font-medium">Search</span>
            </div>
            <div className="space-y-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={values.name}
                    onChange={(e) => onChange({ ...values, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                />
                <input
                    type="text"
                    placeholder="Unit Number"
                    value={values.unitNumber}
                    onChange={(e) => onChange({ ...values, unitNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                />
                <input
                    type="text"
                    placeholder="Project"
                    value={values.project}
                    onChange={(e) => onChange({ ...values, project: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClear} size="sm">Clear</Button>
                <Button onClick={onApply} size="sm">Apply</Button>
            </div>
        </div>
    );
}