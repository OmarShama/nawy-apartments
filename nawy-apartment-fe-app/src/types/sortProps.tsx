export interface SortProps {
    values: {
        sortBy?: string;
        order?: 'ASC' | 'DESC';
    }
    onChange: (sortBy: string, order: 'ASC' | 'DESC') => void;
}