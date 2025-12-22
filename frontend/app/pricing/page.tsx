import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        name: 'Starter',
        price: '$0',
        features: ['Basic Personality Profile', '3 Job Matches / Month', 'Standard Support'],
        cta: 'Get Started',
        primary: false
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/mo',
        features: ['Deep Psychological Analysis', 'Unlimited Job Matches', 'CV Optimization Tips', 'Priority Support', 'Growth Trajectory Report'],
        cta: 'Go Pro',
        primary: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: ['API Access', 'Team Analytics', 'White-label Reports', 'Dedicated Account Manager'],
        cta: 'Contact Sales',
        primary: false
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-24 px-6 container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-400">
                        Invest in your career with plans designed for every stage of your professional journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, i) => (
                        <div
                            key={i}
                            className={`rounded-3xl p-8 border flex flex-col ${tier.primary
                                    ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-900/20 relative overflow-hidden'
                                    : 'bg-slate-950 border-slate-800'
                                }`}
                        >
                            {tier.primary && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl text-white">
                                    POPULAR
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-extrabold">{tier.price}</span>
                                {tier.period && <span className="text-slate-500">{tier.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/questionnaire"
                                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${tier.primary
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
