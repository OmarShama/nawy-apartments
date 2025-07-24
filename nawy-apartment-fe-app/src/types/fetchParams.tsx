export interface FetchParams {
    limit?: number;
    offset?: number;
    name?: string;
    unitNumber?: string;
    project?: string;
    sortBy?: 'size' | 'price' | 'bedroomsCount' | 'bathroomsCount';
    order?: 'ASC' | 'DESC';
    city?: string;
    country?: string;
    size?: string;
    minSize?: string;
    maxSize?: string;
    price?: string;
    minPrice?: string;
    maxPrice?: string;
    bedroomsCount?: string;
    bathroomsCount?: string;
}