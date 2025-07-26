'use client';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

/*
 *
 * Application Footer Component
 * 
 */
export default function Footer() {
    return (
        <footer className="bg-gray-100 px-6 py-8 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Social Media */}
                <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                        <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                    </div>
                </div>

                {/* Projects */}
                <div>
                    <h3 className="font-semibold mb-2">Projects</h3>
                    <ul className="text-gray-700 space-y-1">
                        <li>Downtown Heights</li>
                        <li>New Capital Towers</li>
                        <li>Lake View Residence</li>
                    </ul>
                </div>

                {/* Areas */}
                <div>
                    <h3 className="font-semibold mb-2">Areas</h3>
                    <ul className="text-gray-700 space-y-1">
                        <li>New Cairo</li>
                        <li>Sheikh Zayed</li>
                        <li>6th of October</li>
                        <li>Alexandria</li>
                        <li>North Coast</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
                © 2025 Namy Apartments. All rights reserved.
            </div>
        </footer>
    );
}
