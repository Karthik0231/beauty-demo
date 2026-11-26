import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAISON AURÉLIA — Precision Skin, Hair & Beauty Atelier',
  description:
    'Dark-stage luxury skincare, sculptural facial treatments, botanical hair architecture, and private atelier appointments.',
  icons: {
    icon: '/images/aurelia-emblem.jpg',
    shortcut: '/images/aurelia-emblem.jpg',
    apple: '/images/aurelia-emblem.jpg',
  },
  openGraph: {
    title: 'MAISON AURÉLIA — Precision Skin, Hair & Beauty Atelier',
    description:
      'Sculptural facials, cold-pressed cellular serums, architectural hair styling, and private atelier appointments.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-obsidian text-porcelain antialiased">
        {children}
      </body>
    </html>
  );
}
