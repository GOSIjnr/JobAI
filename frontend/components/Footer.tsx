'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

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

    return (
        <footer className="border-t border-[rgb(var(--border-subtle))]">
            <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
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
                            <a href="#" className="w-9 h-9 rounded-lg bg-[rgb(var(--glass-bg))] border border-[rgb(var(--glass-border))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all">
                                <Twitter size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-[rgb(var(--glass-bg))] border border-[rgb(var(--glass-border))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-[rgb(var(--glass-bg))] border border-[rgb(var(--glass-border))] flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:border-[rgb(var(--border-default))] transition-all">
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
                <div className="pt-8 border-t border-[rgb(var(--border-subtle))] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[rgb(var(--text-muted))]">
                        © {currentYear} JobMatch. All rights reserved.
                    </p>
                    <p className="text-sm text-[rgb(var(--text-muted))]">
                        Find work that fits.
                    </p>
                </div>
            </div>
        </footer>
    );
};
