import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss';
import Footer from '@/components/Footer';

const heming = localFont({
  src: '../fonts/Heming.ttf',
  display: 'swap',
  variable: '--font-heming',
});

const sourceSans3 = localFont({ src: '../fonts/Manrope.ttf', display: 'swap', variable: '--font-source-sans' });

export const metadata = {
  title: `Steven Lucas' Portfolio`,
  description: '',
};

/** @type {import("next").Viewport} */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  shrinkToFit: false,
};

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${sourceSans3.variable} ${heming.variable} ${sourceSans3.className} ${heming.className}`}>
        <Navbar />
        <main style={{ paddingTop: '80px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
