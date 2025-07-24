import React from 'react';

export default function ApartmentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {/* You can add a sidebar, header, or specific layout here */}
            {children}
        </div>
    );
}
