import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Brain, Cpu, Globe, Lock, Zap, BarChart } from 'lucide-react';

const featuresList = [
    {
        icon: <Brain className="w-8 h-8 text-violet-400" />,
        title: 'Cognitive Pattern Recognition',
        desc: 'Our neural networks analyze 50+ dimensions of your problem-solving style to find environments where your brain works best.'
    },
    {
        icon: <Cpu className="w-8 h-8 text-blue-400" />,
        title: 'AI-Driven Trait Extraction',
        desc: 'We use Large Language Models (LLMs) to parse your natural language responses, extracting subtle personality markers.'
    },
    {
        icon: <Globe className="w-8 h-8 text-emerald-400" />,
        title: 'Global Capability Matching',
        desc: 'Match with remote and onsite roles across 140+ countries, normalized for your specific cultural and professional fit.'
    },
    {
        icon: <Lock className="w-8 h-8 text-rose-400" />,
        title: 'Zero-Bias Architecture',
        desc: 'Our matching engine ignores gender, age, and ethnicity, focusing purely on potential, capability, and psychological fit.'
    },
    {
        icon: <Zap className="w-8 h-8 text-amber-400" />,
        title: 'Real-Time Market Alignment',
        desc: 'Job vectors are updated daily based on real-time market data, ensuring you match with current, active opportunities.'
    },
    {
        icon: <BarChart className="w-8 h-8 text-cyan-400" />,
        title: 'Growth Trajectory Prediction',
        desc: 'We don’t just show where you fit now. We predict where you will likely be promoted within 18 months.'
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-24 px-6 container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                        Engineered for Precision
                    </h1>
                    <p className="text-xl text-slate-400">
                        Discover the technology stack behind the world's most advanced career alignment platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((f, i) => (
                        <div key={i} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
                            <div className="mb-6 bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
