'use client';

import { SearchProps } from '@/types/searchProps';
import { FaSearch } from 'react-icons/fa';


export default function SearchPanel({ values, onChange }: SearchProps) {
    return (
        <div className="p-4 border rounded-md w-full md:w-64 bg-white shadow">
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
        </div>
    );
}
