import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss';
import Footer from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const heming = localFont({
  src: '../../fonts/Heming.ttf',
  display: 'swap',
  variable: '--font-heming',
});

const sourceSans3 = localFont({
  src: '../../fonts/Manrope.ttf',
  display: 'swap',
  variable: '--font-source-sans',
});

async function getMessages(locale) {
  try {
    return (await import(`@/locales/${locale}/common.json`)).default;
  } catch (error) {
    notFound();
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Steven Lucas',
  url: 'https://stivluc.com',
  sameAs: ['https://www.linkedin.com/in/stivluc', 'https://github.com/stivluc'],
  jobTitle: 'Full Stack Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
};

export async function generateMetadata({ params: { locale } }) {
  return {
    title: locale === 'fr' ? 'Portfolio de Steven Lucas' : "Steven Lucas' Portfolio",
    description:
      locale === 'fr'
        ? 'Portfolio de Steven Lucas, ingénieur full stack spécialisé en React et Next.js. Disponible pour des projets freelance.'
        : 'Portfolio of Steven Lucas, a full stack engineer specializing in React and Next.js. Available for freelance projects.',
    keywords: [
      'Steven Lucas',
      'Full Stack Engineer',
      'React',
      'Next.js',
      'Python',
      'Django',
      'Agile',
      'MongoDB',
      'Portfolio',
      'Freelance',
    ],
    authors: [{ name: 'Steven Lucas', url: 'https://stivluc.com' }],
    creator: 'Steven Lucas',
    metadataBase: new URL('https://stivluc.com'),
    openGraph: {
      title: locale === 'fr' ? 'Steven Lucas | Ingénieur Full Stack' : 'Steven Lucas | Full Stack Engineer',
      description:
        locale === 'fr'
          ? 'Portfolio de Steven Lucas, ingénieur full stack spécialisé en React et Next.js. Disponible pour des projets freelance.'
          : 'Portfolio of Steven Lucas, a full stack engineer specializing in React and Next.js. Available for freelance projects.',
      url: 'https://stivluc.com',
      siteName: locale === 'fr' ? 'Portfolio de Steven Lucas' : 'Steven Lucas Portfolio',
      images: [
        {
          url: '/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'fr' ? 'Portfolio de Steven Lucas' : 'Steven Lucas Portfolio',
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'fr' ? 'Steven Lucas | Ingénieur Full Stack' : 'Steven Lucas | Full Stack Engineer',
      description:
        locale === 'fr'
          ? 'Portfolio de Steven Lucas, ingénieur full stack spécialisé en React et Next.js. Disponible pour des projets freelance.'
          : 'Portfolio of Steven Lucas, a full stack engineer specializing in React and Next.js. Available for freelance projects.',
      images: ['/opengraph-image.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/Logo.png',
    },
  };
}

export const viewport = {
  width: 'device-width',
  viewportFit: 'cover',
  userScalable: false,
  initialScale: 1,
  shrinkToFit: false,
};

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={`${sourceSans3.variable} ${heming.variable} ${sourceSans3.className} ${heming.className} app`}>
          <Navbar />
          <main style={{ paddingTop: '80px' }}>{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
