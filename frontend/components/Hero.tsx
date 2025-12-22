'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32 lg:pt-32">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-violet-600/20 blur-3xl opacity-50" />
                <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-blue-400 text-sm font-medium mb-6">
                                <Sparkles size={14} />
                                <span>AI-Powered Career Intelligence</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">True Calling</span>
                            </h1>
                            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                                Stop guessing. Connect your psychological profile with the perfect job using our advanced AI matching engine.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link href="/questionnaire" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                                    Start Assessment <ArrowRight size={18} />
                                </Link>
                                <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all flex items-center justify-center">
                                    How it works
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm aspect-video lg:aspect-square">
                                <Image
                                    src="/images/hero.png"
                                    alt="JobMatch AI Visualization"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};
