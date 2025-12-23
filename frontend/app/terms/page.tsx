'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';

export default function TermsPage() {
    useEffect(() => {
        document.title = 'Terms of Service | JobMatch';
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[rgb(var(--bg-base))]">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="heading-1 mb-8">Terms of Service</h1>
                    <p className="text-[rgb(var(--text-muted))] mb-8">Last updated: December 2024</p>

                    <div className="space-y-8 text-[rgb(var(--text-secondary))]">
                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using JobMatch, you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">2. Description of Service</h2>
                            <p>
                                JobMatch provides an AI-powered career assessment tool that analyzes your
                                responses to suggest potential career paths. Our recommendations are based
                                on pattern matching and should be used as one input in your career decisions,
                                not as the sole determining factor.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">3. No Guarantee of Results</h2>
                            <p className="mb-4">
                                Career recommendations are generated algorithmically based on your responses.
                                We do not guarantee that following our recommendations will lead to job offers,
                                career satisfaction, or any specific outcome.
                            </p>
                            <p>
                                Our assessments are for informational and exploratory purposes only and
                                should not replace professional career counseling.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">4. User Responsibilities</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Provide honest and accurate responses to assessment questions</li>
                                <li>Keep your account credentials secure (if you create an account)</li>
                                <li>Use the service for personal, non-commercial purposes only</li>
                                <li>Not attempt to manipulate or game the assessment system</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">5. Intellectual Property</h2>
                            <p>
                                All content, algorithms, and design elements of JobMatch are our intellectual property.
                                You may not copy, modify, or distribute any part of our service without written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">6. Account Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate accounts that violate these terms
                                or engage in abusive behavior. You may delete your account at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">7. Limitation of Liability</h2>
                            <p>
                                JobMatch is provided "as is" without warranties of any kind. We are not liable
                                for any damages arising from your use of the service, including career decisions
                                made based on our recommendations.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">8. Changes to Terms</h2>
                            <p>
                                We may update these terms from time to time. Continued use of JobMatch after
                                changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">9. Contact</h2>
                            <p>
                                Questions about these Terms? Contact us at{' '}
                                <a href="mailto:legal@jobmatch.com" className="text-[rgb(var(--accent-light))] hover:underline">
                                    legal@jobmatch.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
