'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
            <Link href="/">
                <div className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <span className="text-xl font-bold">Nawy Apartments</span>
                </div>
            </Link>

            <nav className="flex items-center space-x-6">
                <Link href="/apartments" className="hover:underline text-gray-700">
                    Explore
                </Link>
                <Image
                    src="/user-icon.png"
                    alt="User Icon"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer"
                />
            </nav>
        </header>
    );
}
