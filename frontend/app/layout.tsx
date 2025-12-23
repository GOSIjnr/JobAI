import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '@/context/ThemeContext';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "JobMatch - Find Your Perfect Career Path",
    template: "%s | JobMatch",
  },
  description: "Take our free 8-minute career assessment to discover careers that match who you really are. No signup required. Get personalized recommendations based on how you actually work.",
  keywords: ["career assessment", "career test", "job matching", "career quiz", "find your career", "career guidance", "job recommendations", "personality career match"],
  authors: [{ name: "JobMatch" }],
  creator: "JobMatch",
  publisher: "JobMatch",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jobmatch.com",
    siteName: "JobMatch",
    title: "JobMatch - Find Your Perfect Career Path",
    description: "Take our free 8-minute career assessment to discover careers that match who you really are.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobMatch - Career Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobMatch - Find Your Perfect Career Path",
    description: "Take our free 8-minute career assessment to discover careers that match who you really are.",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
