'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Default marker icon fix (Leaflet bug in Vite/Next.js)
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

type MapSelectorProps = {
    onLocationSelect: (coords: { lat: number; lng: number } | null) => void;
};

function LocationMarker({ onSelect }: { onSelect: (coords: { lat: number; lng: number } | null) => void }) {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onSelect(e.latlng);
        },
    });

    useEffect(() => {
        if (!position) {
            onSelect(null);
        }
    }, [position]);

    return position ? <Marker position={position} /> : null;
}

export default function MapSelector({ onLocationSelect }: MapSelectorProps) {
    return (
        <div className="w-full h-[400px] mb-4 rounded overflow-hidden">
            <MapContainer center={[30.0444, 31.2357]} zoom={6} className="w-full h-full z-0">
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onSelect={onLocationSelect} />
            </MapContainer>
        </div>
    );
}
