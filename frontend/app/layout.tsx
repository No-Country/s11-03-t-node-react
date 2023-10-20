import './globals.css';
import { inter, secular_one } from '@/fonts/fonts';
import NavBar from './home/navBar/navBar';

export const metadata = {
  title: 'Vet Care',
  description: 'Made for NoCountry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="veterinaria">
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body
        className={`${secular_one.variable} ${inter.variable} ${inter.className} w-full h-full`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
