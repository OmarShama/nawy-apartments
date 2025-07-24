'use client';

import { useEffect, useState, useMemo } from 'react';
import { getApartments } from '@/services/apartmentService';
import { Button } from '@/components/ui/button';
import { ApartmentCard } from '@/components/apartmentCard';
import SearchPanel from '@/components/filters/searchPanel';
import FilterPanel from '@/components/filters/filterPanel';
import SortPanel from '@/components/filters/sortPanel';
import { FetchParams } from '@/types/fetchParams';
import { FilterProps } from '@/types/filterProps';
import { SortProps } from '@/types/sortProps';
import Link from 'next/link';
import { SearchProps } from '@/types/searchProps';
import { useRouter } from 'next/navigation';

export default function ApartmentsPage() {
    const router = useRouter();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [total, setTotal] = useState(0);
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);

    // Filters, search, sort states
    const [search, setSearch] = useState<SearchProps['values']>({
        name: '',
        unitNumber: '',
        project: '',
    });
    const [filters, setFilters] = useState<FilterProps['values']>({});
    const [sort, setSort] = useState<Partial<SortProps['values']>>({});


    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const sortBy =
                    ['price', 'size', 'bedroomsCount', 'bathroomsCount'].includes(
                        sort.sortBy as string
                    )
                        ? (sort.sortBy as FetchParams['sortBy'])
                        : undefined;
                const order =
                    sort.order === 'ASC' || sort.order === 'DESC' ? sort.order : undefined;
                const typedParams: FetchParams = {
                    ...search,
                    ...filters,
                    ...sort,
                    limit,
                    offset,
                    sortBy,
                    order,
                };
                const response = await getApartments(typedParams);
                setApartments(response.data);
                setTotal(response.total);
            } catch (error) {
                console.error('Failed to fetch apartments:', error);
            }
        };

        fetchApartments();
    }, [limit, offset, search, filters, sort]);

    const handleNext = () => {
        if (offset + limit < total) {
            setOffset(offset + limit);
        }
    };

    const handlePrev = () => {
        if (offset - limit >= 0) {
            setOffset(offset - limit);
        }
    };
    const cities = [...new Set(apartments.map((apt) => apt.city))];
    const countries = [...new Set(apartments.map((apt) => apt.country))];
    return (
        <div className="p-6">

            <div className="flex justify-end mb-4">
                <Button onClick={() => router.push('/apartments/create')}>
                    + Create Apartment
                </Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-between mb-6">
                <SearchPanel values={search} onChange={setSearch} />
                <FilterPanel values={filters} onChange={setFilters} options={{ cities, countries }} />
                <SortPanel
                    values={sort}
                    onChange={(sortBy, order) => setSort({ sortBy, order })}
                />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {apartments.map((apt) => (
                    <Link key={apt.id} href={`/apartments/${apt.id}`}>
                        <ApartmentCard key={apt.id} {...apt} />
                    </Link>
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
                <Button onClick={handlePrev} disabled={offset === 0}>
                    Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                    Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
                </span>
                <Button onClick={handleNext} disabled={offset + limit >= total}>
                    Next
                </Button>
            </div>
        </div>
    );
}