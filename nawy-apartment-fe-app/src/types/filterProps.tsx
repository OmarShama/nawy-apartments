export interface FilterProps {
    values: {
        size?: string;
        minSize?: number;
        maxSize?: number;
        price?: string;
        minPrice?: number;
        maxPrice?: number;
        bathroomsCount?: string;
        bedroomsCount?: string;
        city?: string;
        country?: string;
    };
    onChange: (newValues: FilterProps['values']) => void;
    options: {
        cities: string[];
        countries: string[];
        maxSize: number;
        maxPrice: number;
    };
}