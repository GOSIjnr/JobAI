'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
            scrolled ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-3" : "bg-transparent py-5"
        )}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                    JobMatch
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition">Features</Link>
                    <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition">About</Link>
                    <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition">Pricing</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/questionnaire" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-500/25">
                        Start Career Test
                    </Link>
                </div>
            </div>
        </header>
    );
};
