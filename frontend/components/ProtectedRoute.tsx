'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const protectedRoutes = ['/questionnaire', '/results'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && protectedRoutes.includes(pathname)) {
            router.push('/login');
        }
    }, [isAuthenticated, pathname, router]);

    return <>{children}</>;
}
