'use client';

import { useEffect, useRef, useState } from 'react';
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
import { Apartment } from '@/types/apartment';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';

export default function ApartmentsPage() {
    const router = useRouter();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const [search, setSearch] = useState<SearchProps['values']>({
        name: '',
        unitNumber: '',
        project: '',
    });
    const [filters, setFilters] = useState<FilterProps['values']>({});
    const [sort, setSort] = useState<Partial<SortProps['values']>>({});

    const [searchDraft, setSearchDraft] = useState(search);
    const [filtersDraft, setFiltersDraft] = useState(filters);

    const [activePanel, setActivePanel] = useState<'search' | 'filter' | 'sort' | null>(null);

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

    useEffect(() => {
        fetchApartments();
    }, [limit, offset, search, filters, sort, total]);

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
    const iconRef = useRef<HTMLButtonElement>(null);
    const cities = [...new Set(apartments.map((apt) => apt.city))];
    const countries = [...new Set(apartments.map((apt) => apt.country))];
    const maxSize = Math.max(...apartments.map((a) => a.size || 0));
    const maxPrice = Math.max(...apartments.map((a) => a.price || 0));
    return (
        <div className="p-6">
            <div className="flex justify-end mb-4">
                <Button onClick={() => router.push('/apartments/create')}>
                    + Create Apartment
                </Button>
            </div>

            <div >
                <div className="flex items-center gap-4 mb-4">
                    <Button variant={activePanel === 'search' ? 'default' : 'outline'} onClick={() => setActivePanel(prev => (prev === 'search' ? null : 'search'))}><FaSearch /></Button>
                    <Button variant={activePanel === 'filter' ? 'default' : 'outline'} onClick={() => setActivePanel(prev => (prev === 'filter' ? null : 'filter'))}><FaFilter /></Button>
                    <Button ref={iconRef} variant={activePanel === 'sort' ? 'default' : 'outline'} onClick={() => setActivePanel(prev => (prev === 'sort' ? null : 'sort'))}><FaSortAmountDown /></Button>
                </div>

                {activePanel === 'search' && (
                    <SearchPanel
                        values={searchDraft}
                        onChange={setSearchDraft}
                        onApply={() => {
                            setSearch(searchDraft);
                            setActivePanel(null); // Close the panel
                        }}
                        onClear={() => {
                            setSearchDraft({ name: '', unitNumber: '', project: '' });
                            setSearch({ name: '', unitNumber: '', project: '' });
                        }}
                    />
                )}

                {activePanel === 'filter' && (
                    <FilterPanel
                        values={filtersDraft}
                        onChange={setFiltersDraft}
                        options={{ cities, countries, maxSize, maxPrice }}
                        onApply={() => {
                            setFilters(filtersDraft);
                            setActivePanel(null); // Close the panel
                        }}
                        onClear={() => {
                            setFiltersDraft({});
                            setFilters({});
                        }}
                    />
                )}

                {activePanel === 'sort' && (
                    <SortPanel
                        values={sort}
                        onChange={(sortBy, order) => setSort({ sortBy, order })}
                        activePanel={activePanel}
                        setActivePanel={setActivePanel}
                        iconRef={iconRef}
                    />
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {apartments.map((apt) => (
                    <Link key={apt.id} href={`/apartments/${apt.id}`}>
                        <ApartmentCard key={apt.id} {...apt} />
                    </Link>
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
                <Button onClick={handlePrev} disabled={offset === 0}>Previous</Button>
                <span className="text-sm text-muted-foreground">
                    Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
                </span>
                <Button onClick={handleNext} disabled={offset + limit >= total}>Next</Button>
                <div className="flex items-center gap-2">
                    <label htmlFor="limit-select" className="text-sm font-medium text-gray-700">
                        Apartments per page:
                    </label>
                    <select
                        id="limit-select"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setOffset(0);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {[5, 10, 15, 20].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >
    );
}
