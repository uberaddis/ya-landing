import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Download } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    const footerLinks = {
        services: [
            { name: 'Ride Hailing', href: '#' },
            { name: 'Food Delivery', href: '#' },
            { name: 'Package Delivery', href: '#' },
            { name: 'Grocery Delivery', href: '#' }
        ],
        company: [
            { name: 'About Us', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Blog', href: '#' }
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Safety', href: '#' },
            { name: 'Contact Us', href: '#' },
            { name: 'Driver Support', href: '#' }
        ],
        legal: [
            { name: 'Terms of Service', href: '#' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'Accessibility', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' }
    ];

    return (
        <footer className="bg-black text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                                <Image src="/logo_vb.png" alt="Ya Logo" width={100} height={100} className="object-contain" />
                            </div>
                            <h3 className="text-2xl text-white">Ride</h3>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Your all-in-one platform for rides, food, packages, and grocery delivery.
                            Experience convenience like never before.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-400">
                                <MapPin className="w-5 h-5 mr-3 text-green-500" />
                                <span>123 Tech Street, San Francisco, CA 94105</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Phone className="w-5 h-5 mr-3 text-green-500" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Mail className="w-5 h-5 mr-3 text-green-500" />
                                <span>support@ya-ride.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg mb-6 text-green-400">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg mb-6 text-green-400">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg mb-6 text-green-400">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg mb-6 text-green-400">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* App Download Section */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h4 className="text-xl mb-2 text-green-400">Get the App</h4>
                            <p className="text-gray-400">Download our app for the best experience</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#"
                                className="flex items-center bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group"
                            >
                                <Download className="w-5 h-5 mr-3 group-hover:text-green-600" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-600">Download on the</div>
                                    <div className="text-sm">App Store</div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group"
                            >
                                <Download className="w-5 h-5 mr-3 group-hover:text-green-600" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-600">Get it on</div>
                                    <div className="text-sm">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Social Media & Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="flex space-x-6 mb-6 lg:mb-0">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>

                        <div className="text-center lg:text-right">
                            <p className="text-gray-400">
                                © 2025 Ya-ride. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}