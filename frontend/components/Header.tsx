'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { href: '/questionnaire', label: 'Assessment', description: 'Find your career match' },
        { href: '/roadmap', label: 'Roadmaps', description: 'Learning paths for any career' },
        { href: '/progress', label: 'My Progress', description: 'Track your journey' },
        { href: '/features', label: 'How It Works', description: 'Learn about our methodology' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass'
                : 'bg-transparent'
                }`}
        >
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group touch-feedback">
                        <div className="relative">
                            <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[rgb(var(--accent))] to-teal-400 flex items-center justify-center shadow-lg shadow-[rgb(var(--accent))]/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[rgb(var(--accent))] to-teal-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                        </div>
                        <span className="text-xl font-bold text-[rgb(var(--text-primary))]">
                            JobMatch
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="btn btn-icon btn-ghost"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <Link href="/login" className="btn btn-ghost text-sm">
                            Sign In
                        </Link>

                        <Link href="/questionnaire" className="btn btn-primary text-sm">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex md:hidden items-center gap-1">
                        <button
                            onClick={toggleTheme}
                            className="btn btn-icon btn-ghost touch-target"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="btn btn-icon btn-ghost touch-target"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Full Screen Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-16 z-40 md:hidden"
                    >
                        {/* Background */}
                        <motion.div
                            className="absolute inset-0 bg-[rgb(var(--bg-base))]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />

                        {/* Content */}
                        <motion.nav
                            className="relative h-full flex flex-col px-4 pt-6 pb-8 overflow-y-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Nav Links */}
                            <div className="flex-1 space-y-2">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center justify-between p-4 rounded-xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] touch-feedback"
                                        >
                                            <div>
                                                <div className="text-base font-semibold text-[rgb(var(--text-primary))]">
                                                    {link.label}
                                                </div>
                                                <div className="text-sm text-[rgb(var(--text-muted))]">
                                                    {link.description}
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="text-[rgb(var(--text-muted))]" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom Actions */}
                            <motion.div
                                className="mt-8 space-y-3 pb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link
                                    href="/questionnaire"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-primary btn-lg w-full"
                                >
                                    Start Free Assessment
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-secondary btn-lg w-full"
                                >
                                    Sign In
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
