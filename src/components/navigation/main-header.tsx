import { getTranslations } from 'next-intl/server';
import ThemeToggle from './theme-toggle';

type MainHeaderProps = {
  locale: string;
};

const NAV_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const;

export default async function MainHeader({ locale }: MainHeaderProps) {
  const t = await getTranslations({ locale, namespace: 'navigation' });
  const otherLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur">
      <div className="mx-auto flex h-header-mobile w-full max-w-6xl items-center justify-between px-5 sm:px-8 md:h-header">
        <a
          href={`/${locale}`}
          className="text-sm font-semibold text-foreground transition-colors hover:text-emerald-500"
          aria-label={t('brand')}
        >
          {t('brand')}
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 text-xs text-muted-foreground sm:gap-2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="hidden px-2 py-2 transition-colors hover:text-foreground sm:inline-flex"
            >
              {t(item.key)}
            </a>
          ))}
          <a
            href={`/${otherLocale}`}
            className="border border-border h-8 flex items-center justify-center px-2.5 py-1.5 text-foreground transition-colors hover:border-emerald-500 hover:text-emerald-500"
          >
            {t('locale')}
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
