export interface SearchValues {
    name: string;
    unitNumber: string;
    project: string;
}

export interface SearchProps {
    values: SearchValues;
    onChange: (values: SearchValues) => void;
}