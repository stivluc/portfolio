import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss';

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

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${sourceSans3.variable} ${heming.variable} ${sourceSans3.className} ${heming.className}`}>
        {/* <AnimatedCursor
          innerSize={5}
          outerSize={30}
          color='200,200,200'
          outerAlpha={0.3}
          innerScale={0.7}
          outerScale={1.3}
          trailingSpeed={5}
          outerStyle={{
            border: '2px solid var(--cursor-color)',
          }}
          innerStyle={{
            backgroundColor: 'var(--cursor-color)',
          }}
        /> */}
        <Navbar />
        <main style={{ paddingTop: '80px' }}>{children}</main>
      </body>
    </html>
  );
}
