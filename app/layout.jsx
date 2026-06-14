import './globals.css';
import './responsive.css';
import Navbar from '@/components/layouts/Navbar/Navbar';
import Footer from '@/components/layouts/Footer/Footer';
import BackgroundMusic from '@/components/shared/BackgroundMusic/BackgroundMusic';

export const metadata = {
  title: 'India For Manipur — A Humanitarian Awareness Campaign',
  description:
    'Manipur has always stood for India. Today, India must stand for Manipur. A non-partisan humanitarian awareness campaign about the people of Manipur — their contributions, their suffering, and their hope.',
  keywords:
    'Manipur, India, humanitarian crisis, awareness, people of Manipur, unity, Mary Kom, Mirabai Chanu, relief, peace',
  authors: [{ name: 'India For Manipur Campaign' }],
  openGraph: {
    title: 'India For Manipur — A Humanitarian Awareness Campaign',
    description:
      'They Carried India\'s Pride. Let Us Carry Their Voice. A humanitarian storytelling campaign.',
    url: 'https://indiaformanipure.org',
    siteName: 'India For Manipur',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India For Manipur',
    description: 'They Carried India\'s Pride. Let Us Carry Their Voice.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <BackgroundMusic />
      </body>
    </html>
  );
}
