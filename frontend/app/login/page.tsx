'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    useEffect(() => {
        document.title = 'Sign In | JobMatch';
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            login(data.token, data.user);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(var(--bg-base))] text-[rgb(var(--text-primary))] flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center px-6">
                <div className="w-full max-w-md card p-8">
                    <h1 className="heading-1 mb-2 text-center">Welcome back</h1>
                    <p className="text-[rgb(var(--text-muted))] text-center mb-8">Sign in to view your saved results</p>

                    {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 focus:border-[rgb(var(--accent))] focus:outline-none transition text-[rgb(var(--text-primary))]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 focus:border-[rgb(var(--accent))] focus:outline-none transition text-[rgb(var(--text-primary))]"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full btn btn-primary btn-lg">
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-[rgb(var(--text-muted))] text-sm">
                        Don't have an account? <Link href="/register" className="text-[rgb(var(--accent-light))] hover:text-[rgb(var(--accent))]">Create one</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
