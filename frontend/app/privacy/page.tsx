'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';

export default function PrivacyPage() {
    useEffect(() => {
        document.title = 'Privacy Policy | JobMatch';
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[rgb(var(--bg-base))]">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="heading-1 mb-8">Privacy Policy</h1>
                    <p className="text-[rgb(var(--text-muted))] mb-8">Last updated: December 2024</p>

                    <div className="space-y-8 text-[rgb(var(--text-secondary))]">
                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Overview</h2>
                            <p>
                                JobMatch ("we", "our", or "us") is committed to protecting your privacy.
                                This Privacy Policy explains how we collect, use, and safeguard your information
                                when you use our career assessment service.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Information We Collect</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Assessment Responses:</strong> Your answers to our career questionnaire</li>
                                <li><strong>Account Information:</strong> Email and password if you create an account (optional)</li>
                                <li><strong>Usage Data:</strong> Anonymous analytics about how you use the site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">How We Use Your Information</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>To generate personalized career recommendations</li>
                                <li>To improve our matching algorithms</li>
                                <li>To communicate with you about your account (if registered)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Data Storage & Security</h2>
                            <p className="mb-4">
                                Your assessment results are primarily stored locally in your browser.
                                If you choose not to create an account, we do not store your personal data on our servers.
                            </p>
                            <p>
                                If you create an account, your data is encrypted and stored securely.
                                We use industry-standard security measures to protect your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Your Rights</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Access your personal data at any time</li>
                                <li>Request deletion of your account and data</li>
                                <li>Take the assessment anonymously without an account</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Cookies</h2>
                            <p>
                                We use essential cookies for site functionality and optional analytics cookies
                                to understand how our service is used. You can disable cookies in your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Third-Party Services</h2>
                            <p>
                                We do not sell your data to third parties. We may use analytics services
                                to improve our platform, but this data is anonymized.
                            </p>
                        </section>

                        <section>
                            <h2 className="heading-3 text-[rgb(var(--text-primary))] mb-4">Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please contact us at{' '}
                                <a href="mailto:privacy@jobmatch.com" className="text-[rgb(var(--accent-light))] hover:underline">
                                    privacy@jobmatch.com
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
