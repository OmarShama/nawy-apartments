export interface FilterProps {
    values: {
        size?: string;
        minSize?: string;
        maxSize?: string;
        price?: string;
        minPrice?: string;
        maxPrice?: string;
        bathroomsCount?: string;
        bedroomsCount?: string;
        city?: string;
        country?: string;
    };
    onChange: (newValues: FilterProps['values']) => void;
    options: {
        cities: string[];
        countries: string[];
    };
}