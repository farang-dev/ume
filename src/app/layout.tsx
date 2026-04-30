import type { Metadata } from 'next';
import '../app/globals.css';

export const metadata: Metadata = {
  title: 'Ume Tattoo',
  description: 'Ume Tattoo Studio — Vilnius',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
