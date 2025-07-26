/*
 *
 * Filter Values Model
 *  For filter props
 */
export interface FilterValues {
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
}
/*
 *
 * Filter Props Model
 *  For filter panel
 */
export interface FilterProps {
    values: FilterValues;
    onChange: (newValues: FilterProps['values']) => void;
    options: {
        cities: string[];
        countries: string[];
        maxSize: number;
        maxPrice: number;
    };
}