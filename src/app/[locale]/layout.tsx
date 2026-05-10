import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import MainHeader from '@/components/navigation/main-header';
import { getTranslations } from 'next-intl/server';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = 'https://eyadomar.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'metadata',
  });

  const isArabic = locale === 'ar';

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: t('home.title'),
      template: `%s | ${t('site.creator')}`,
    },

    description: t('home.description'),

    keywords: t.raw('home.keywords'),

    authors: [
      {
        name: t('site.creator'),
        url: siteUrl,
      },
    ],

    creator: t('site.creator'),
    publisher: t('site.creator'),
    applicationName: t('site.name'),
    category: 'technology',

    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/',
        ar: '/ar',
        'x-default': '/',
      },
    },

    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}`,
      siteName: t('site.name'),
      title: t('home.title'),
      description: t('home.description'),
      locale: isArabic ? 'ar_EG' : 'en_US',
      alternateLocale: isArabic ? ['en_US'] : ['ar_EG'],
    },

    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainHeader locale={locale} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
