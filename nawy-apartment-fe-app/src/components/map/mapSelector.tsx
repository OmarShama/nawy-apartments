'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

/*
 *
 * Map Container Component
 *  For map in create form
 */
export default function MapSelector({
    value,
    onChange,
}: {
    value: { lat: number; lng: number } | null;
    onChange: (coords: { lat: number; lng: number } | null) => void;
}) {
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                onChange(e.latlng);
            },
        });

        return value ? <Marker position={value} /> : null;
    };

    return (
        <div className="w-full h-[400px] rounded overflow-hidden mb-4">
            <MapContainer
                center={value || [30.0444, 31.2357]}
                zoom={6}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
}
