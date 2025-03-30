'use client';

import './globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/shared/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}