import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button variant="ghost" className="font-bold text-xl p-0" asChild>
            <Link href="/">E-Fronpeer</Link>
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {[
                  { href: '/', label: 'ホーム' },
                  { href: '/#services', label: 'サービス' },
                  { href: '/#about', label: '会社概要' },
                  { href: '/blog', label: 'ブログ' },
                  { href: '/#contact', label: 'お問い合わせ' }
                ].map(({ href, label }) => (
                  <NavigationMenuItem key={href}>
                    <Button
                      variant="ghost"
                      className="px-3 py-2 hover:text-primary transition-colors"
                      asChild
                    >
                      <a href={href}>{label}</a>
                    </Button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {[
                { href: '#home', label: 'ホーム' },
                { href: '#services', label: 'サービス' },
                { href: '#about', label: '会社概要' },
                { href: '#contact', label: 'お問い合わせ' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <a href={href}>{label}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}