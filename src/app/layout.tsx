import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IBT Solutions | Caribbean Business Platform",
  description: "AI-powered business solutions, APIs, and connectivity for Caribbean enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}