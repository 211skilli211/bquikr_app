import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quikr Solutions | Caribbean & South America Business Platform",
  description: "AI-powered business solutions for Caribbean and South America economies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Quikr
                </span>
                <span className="text-sm text-slate-500 font-medium">Solutions</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="/" className="text-slate-300 hover:text-cyan-400 transition-colors">Home</a>
                <a href="/documents" className="text-slate-300 hover:text-cyan-400 transition-colors">Documents</a>
                <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
                <a href="#solutions" className="text-slate-300 hover:text-cyan-400 transition-colors">Solutions</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-800 bg-slate-950 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
            <p>&copy; 2026 Quikr Solutions. Building the future of Caribbean & South America business.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}