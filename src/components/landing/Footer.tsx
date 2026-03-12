import { Truck } from "lucide-react";

const productLinks = ["Features", "Pricing", "Changelog", "API Docs", "Status"];
const companyLinks = ["About", "Blog", "Careers", "Contact", "Privacy Policy", "Terms"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card" id="contact">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary-500" />
            <span className="font-heading text-lg font-bold text-foreground">
              Pariskq
            </span>
          </div>
          <p className="mb-4 text-sm text-neutral-600 max-w-xs">
            The complete TMS for modern transport operators.
          </p>
          <div className="flex gap-3">
            <a href="#" aria-label="LinkedIn" className="text-neutral-400 hover:text-primary-500 transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-neutral-400 hover:text-primary-500 transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Product
          </h4>
          <ul className="space-y-2">
            {productLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Company
          </h4>
          <ul className="space-y-2">
            {companyLinks.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Contact
          </h4>
          <p className="text-sm text-neutral-600">hello@pariskq.com</p>
          <p className="mt-2 text-sm text-neutral-500">
            Based in India. Built for India.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <p className="text-xs text-neutral-500">
            © 2025 Pariskq. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Made with ❤️ for Indian logistics
          </p>
        </div>
      </div>
    </footer>
  );
}
