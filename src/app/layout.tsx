import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Header from '../components/Header'
import Footer from '../components/Footer'
import theme from '../theme'
import { Typography, Box, Container, Grid2 as Grid } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import "./globals.css";

// Khronos uses: OpenSans-Semibold, Helvetica, Arial, sans-serif;
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"]
})

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
      <body className={`${openSans.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <InitColorSchemeScript attribute="class" />
            <Box sx={{ display: 'flex', flexDirection: 'column', position: "absolute", top: 0, right: 0, bottom: 0, left: 0}}>
              <Header />
              <Container sx={{flexGrow: 1, overflow: "auto" }} maxWidth={false}>
                {children}
              </Container>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
