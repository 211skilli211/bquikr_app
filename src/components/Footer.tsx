import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/documents', label: 'Documents' },
  { href: '/api-services', label: 'API Services' },
  { href: '/geospatial', label: 'Maps' },
  { href: '/avatar', label: 'Avatar' },
  { href: '/simulation', label: 'Simulation' },
];

const socialLinks = [
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'Discord' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Quikr
              </span>
              <span className="text-sm text-slate-500 font-medium">Solutions</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              AI-powered business platform for Caribbean & South America economies. 
              Building the future of regional commerce with intelligent tools.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Connect</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2026 Quikr Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Terms</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}