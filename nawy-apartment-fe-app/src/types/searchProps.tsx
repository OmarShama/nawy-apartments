/*
 *
 * Search Values Model
 *  For search prop
 */
export interface SearchValues {
    name: string;
    unitNumber: string;
    project: string;
}

/*
 *
 * Search Props Model
 *  For search panel
 */
export interface SearchProps {
    values: SearchValues;
    onChange: (values: SearchValues) => void;
}