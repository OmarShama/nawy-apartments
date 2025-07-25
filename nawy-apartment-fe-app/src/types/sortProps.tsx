export interface SortProps {
    values: {
        sortBy?: string;
        order?: string;
    }
    onChange: (sortBy: string, order: string) => void;
}