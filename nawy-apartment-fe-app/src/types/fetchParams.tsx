export interface FetchParams {
    limit?: number;
    offset?: number;
    name?: string;
    unitNumber?: string;
    project?: string;
    sortBy?: 'size' | 'price' | 'bedroomsCount' | 'bathroomsCount';
    order?: string;
    city?: string;
    country?: string;
    size?: string;
    minSize?: number;
    maxSize?: number;
    price?: string;
    minPrice?: number;
    maxPrice?: number;
    bedroomsCount?: string;
    bathroomsCount?: string;
}