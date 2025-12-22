export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12">
            <div className="container mx-auto px-6 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="text-xl font-bold text-white mb-4">JobMatch</div>
                        <p className="text-slate-500 text-sm">
                            The AI-powered career alignment platform.
                        </p>
                    </div>
                    {/* Columns placeholder */}
                </div>
                <div className="text-slate-600 text-sm pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} JobMatch Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-400 transition">Privacy</a>
                        <a href="#" className="hover:text-slate-400 transition">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
