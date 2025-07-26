/*
 *
 * Sort Props Model
 *  For sort panel
 */

export interface SortProps {
    values: {
        sortBy?: string;
        order?: string;
    }
    onChange: (sortBy: string, order: string) => void;
}