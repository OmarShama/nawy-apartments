import { useEffect, useRef } from 'react';
import { SortProps } from '@/types/sortProps';

/*
 *
 * Sort Panel Component
 *  For sorting in apartments list
 */
export default function SortPanel({
    values,
    onChange,
    activePanel,
    setActivePanel,
    iconRef,
}: SortProps & {
    activePanel: 'search' | 'filter' | 'sort' | null;
    setActivePanel: (panel: 'search' | 'filter' | 'sort' | null) => void;
    iconRef: React.RefObject<HTMLButtonElement | null>;
}) {
    const isOpen = activePanel === 'sort';
    const panelRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (sortBy: string, order: string) => {
        onChange(sortBy, order);
        setActivePanel(null);
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                panelRef.current &&
                !panelRef.current.contains(target) &&
                iconRef?.current &&
                !iconRef.current.contains(target)
            ) {
                setActivePanel(null);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, setActivePanel, iconRef]);

    if (!isOpen) return null;

    return (
        <div
            ref={panelRef}
            className="absolute z-20 mt-2 bg-white border shadow-md rounded-md w-64 p-2 space-y-1"
        >
            <div className="text-sm font-medium text-muted-foreground mb-1">Sort By</div>
            {[
                { label: 'Price (lowest to highest)', sortBy: 'price', order: 'ASC' },
                { label: 'Price (highest to lowest)', sortBy: 'price', order: 'DESC' },
                { label: 'Size (lowest to highest)', sortBy: 'size', order: 'ASC' },
                { label: 'Size (highest to lowest)', sortBy: 'size', order: 'DESC' },
                { label: 'Bedrooms (lowest to highest)', sortBy: 'bedroomsCount', order: 'ASC' },
                { label: 'Bedrooms (highest to lowest)', sortBy: 'bedroomsCount', order: 'DESC' },
                { label: 'Bathrooms (lowest to highest)', sortBy: 'bathroomsCount', order: 'ASC' },
                { label: 'Bathrooms (highest to lowest)', sortBy: 'bathroomsCount', order: 'DESC' },
            ].map((opt) => {
                const isSelected =
                    values.sortBy === opt.sortBy && values.order === opt.order;
                return (
                    <button
                        key={opt.label}
                        className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${isSelected ? 'bg-blue-100 font-semibold' : ''
                            }`}
                        onClick={() => handleSelect(opt.sortBy, opt.order)}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}
