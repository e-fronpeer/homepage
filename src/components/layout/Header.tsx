import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export function Header() {
  const { basePath } = useRouter();

  const resolveHref = (href: string) =>
    href.startsWith('/') ? `${basePath}${href}` : href;

  return (
    <header className="fixed w-full bg-background/90 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button variant="ghost" className="font-bold text-xl p-0" asChild>
            <Link href="/">E-Fronpeer</Link>
          </Button>

          <nav>
            <Button
              variant="ghost"
              className="px-3 py-2 hover:text-primary transition-colors"
              asChild
            >
              <a href={resolveHref('/blog')}>ブログ</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
