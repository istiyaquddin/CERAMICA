import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-container-max mx-auto py-16 px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Branding & About */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-widest text-primary dark:text-neutral uppercase">
            CERAMICA
          </h4>
          <p className="font-manrope text-[10px] uppercase tracking-[0.15em] leading-relaxed text-secondary font-medium max-w-xs">
            Curating the finest architectural surfaces for modern environments. 
            Precision in every cut, soul in every surface.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-6">
          <h5 className="font-manrope text-[10px] uppercase tracking-[0.2em] font-bold text-primary dark:text-neutral">
            Navigation
          </h5>
          <ul className="font-manrope text-[10px] uppercase tracking-[0.15em] space-y-4">
            <li>
              <Link href="/all-tiles" className="text-secondary hover:text-primary dark:text-neutral/70 dark:hover:text-neutral transition-colors font-medium">
                Collections
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary hover:text-primary dark:text-neutral/70 dark:hover:text-neutral transition-colors font-medium">
                Specifications
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary hover:text-primary dark:text-neutral/70 dark:hover:text-neutral transition-colors font-medium">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary hover:text-primary dark:text-neutral/70 dark:hover:text-neutral transition-colors font-medium">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h5 className="font-manrope text-[10px] uppercase tracking-[0.2em] font-bold text-primary dark:text-neutral">
            Contact Us
          </h5>
          <p className="font-manrope text-[10px] uppercase tracking-[0.15em] text-secondary font-medium">
            Studio 42, Architectural District<br />
            Milan, Italy 20121<br /><br />
            inquiries@ceramica.design<br />
            +39 02 1234 5678
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Pinterest</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-8 text-center">
        <p className="font-manrope text-[10px] uppercase tracking-[0.15em] text-secondary/60">
          © {new Date().getFullYear()} CERAMICA ARCHITECTURAL TILES. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
