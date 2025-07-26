'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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
 *  For map in details page
 */

export default function ApartmentLocationMap({
    lat,
    lng,
}: {
    lat: number;
    lng: number;
}) {
    return (
        <div className="w-full h-[400px] rounded overflow-hidden mb-6">
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]} />
            </MapContainer>
        </div>
    );
}
