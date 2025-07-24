import { FetchParams } from "@/types/fetchParams";

export function buildQueryParams(input: FetchParams = {}): string {
    const params = new URLSearchParams();

    Object.entries(input).forEach(([key, value]) => {
        if (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            !(typeof value === 'number' && isNaN(value))
        ) {
            params.append(key, String(value));
        }
    });

    const query = params.toString();
    return query ? `?${query}` : '';
}
