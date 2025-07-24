export interface SearchProps {
    values: { name: string; unitNumber: string; project: string };
    onChange: (values: any) => void;
}