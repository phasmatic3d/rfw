import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Header from '../components/Header'
import theme from '../theme'
import "./globals.css";
import { Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Khronos uses: OpenSans-Semibold, Helvetica, Arial, sans-serif;

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Khronos Render Fidelity",
  description: "Khronos Render Fidelity Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <InitColorSchemeScript attribute="class" />
            <Header/>
            {children}
            <footer style={{background:"#0D1720"}}>
              <Typography variant="h6" style={{color: 'white', textAlign:'center'}}>KHRONOS FOOTER</Typography>
            </footer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
