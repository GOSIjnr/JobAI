'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [openSection, setOpenSection] = useState<string | null>(null);

    const links = {
        product: [
            { label: 'Assessment', href: '/questionnaire' },
            { label: 'How It Works', href: '/#methodology' },
            { label: 'Features', href: '/#features' },
        ],
        company: [
            { label: 'About', href: '/about' },
        ],
        legal: [
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
        ],
    };

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    // Accordion component for mobile
    const AccordionSection = ({ title, items, sectionKey }: { title: string; items: typeof links.product; sectionKey: string }) => {
        const isOpen = openSection === sectionKey;

        return (
            <div className="border-b border-[rgb(var(--border-subtle))] sm:border-none">
                {/* Mobile: Accordion trigger */}
                <button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full flex items-center justify-between py-4 sm:hidden touch-target"
                >
                    <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))]">{title}</h4>
                    <ChevronDown
                        size={20}
                        className={`text-[rgb(var(--text-muted))] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Desktop: Always visible title */}
                <h4 className="hidden sm:block text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">{title}</h4>

                {/* Mobile: Collapsible content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="sm:hidden overflow-hidden pb-4 space-y-3"
                        >
                            {items.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors py-2 block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                {/* Desktop: Always visible list */}
                <ul className="hidden sm:block space-y-3">
                    {items.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <footer className="border-t border-[rgb(var(--border-subtle))]">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
                {/* Mobile: Brand centered at top */}
                <div className="sm:hidden text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[rgb(var(--accent))] to-teal-400 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[rgb(var(--text-primary))]">JobMatch</span>
                    </Link>
                    <p className="text-sm text-[rgb(var(--text-muted))] max-w-xs mx-auto mb-6">
                        Discover careers that match who you really are.
                    </p>

                    {/* Social icons - larger for mobile */}
                    <div className="flex justify-center gap-4">
                        <a href="#" className="w-12 h-12 rounded-xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all touch-target">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all touch-target">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all touch-target">
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                {/* Mobile: Accordion links */}
                <div className="sm:hidden mb-8">
                    <AccordionSection title="Product" items={links.product} sectionKey="product" />
                    <AccordionSection title="Company" items={links.company} sectionKey="company" />
                    <AccordionSection title="Legal" items={links.legal} sectionKey="legal" />
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgb(var(--accent))] to-teal-400 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-[rgb(var(--text-primary))]">JobMatch</span>
                        </Link>
                        <p className="text-sm text-[rgb(var(--text-muted))] mb-6 max-w-xs">
                            Discover careers that match who you really are, not just what's on your resume.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all">
                                <Twitter size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-subtle))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all">
                                <Github size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Product</h4>
                        <ul className="space-y-3">
                            {links.product.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Company</h4>
                        <ul className="space-y-3">
                            {links.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))] mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {links.legal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-6 sm:pt-8 border-t border-[rgb(var(--border-subtle))] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <p className="text-sm text-[rgb(var(--text-muted))]">
                        © {currentYear} JobMatch. All rights reserved.
                    </p>
                    <p className="text-sm text-[rgb(var(--text-muted))]">
                        Find work that fits. ✨
                    </p>
                </div>
            </div>
        </footer>
    );
};
