"use client";
import { Inter } from 'next/font/google';
import ResponsiveAppBar from "../components/navbar/navbar";
const inter = Inter({ subsets: ['latin'] });
import '../styles/styles.css'; // CSS dosyasını import edin

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <ResponsiveAppBar />
        <main className="content">
          {children}
        </main>
      </body>
    </html>
  );
}
