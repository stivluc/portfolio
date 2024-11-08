import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss';
import Footer from '@/components/Footer';

const heming = localFont({
  src: '../fonts/Heming.ttf',
  display: 'swap',
  variable: '--font-heming',
});

const sourceSans3 = localFont({ src: '../fonts/Manrope.ttf', display: 'swap', variable: '--font-source-sans' });

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Steven Lucas',
  url: 'https://stivluc.com',
  sameAs: ['https://www.linkedin.com/in/stivluc', 'https://github.com/stivluc'],
  jobTitle: 'Full-Stack Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
};

export const metadata = {
  title: `Steven Lucas' Portfolio`,
  description:
    'Portfolio of Steven Lucas, a full-stack engineer specializing in React and Next.js. Available for freelance projects.',
  keywords: ['Steven Lucas', 'Full-Stack Engineer', 'React', 'Next.js', 'Portfolio', 'Freelance'],
  authors: [{ name: 'Steven Lucas', url: 'https://stivluc.com' }],
  creator: 'Steven Lucas',
  metadataBase: new URL('https://stivluc.com'),
  openGraph: {
    title: 'Steven Lucas | Full-Stack Engineer',
    description:
      'Portfolio of Steven Lucas, a full-stack engineer specializing in React and Next.js. Available for freelance projects.',
    url: 'https://stivluc.com',
    siteName: 'Steven Lucas Portfolio',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Steven Lucas Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steven Lucas | Full-Stack Engineer',
    description:
      'Portfolio of Steven Lucas, a full-stack engineer specializing in React and Next.js. Available for freelance projects.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/Logo.png',
  },
};

/** @type {import("next").Viewport} */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  shrinkToFit: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${sourceSans3.variable} ${heming.variable} ${sourceSans3.className} ${heming.className}`}>
        <Navbar />
        <main style={{ paddingTop: '80px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
