import type {Metadata} from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Joakim H. Nguyen | AI Researcher & Engineer',
  description: 'Portfolio of Joakim H. Nguyen, M.S. in AI at UT Austin. Specializing in computational pathology, LLMs, and AI in healthcare.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-zinc-950 text-zinc-300 font-sans antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
