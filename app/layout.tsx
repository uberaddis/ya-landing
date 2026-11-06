import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import '../styles/globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-bricolage', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-instrument', display: 'swap' })

export const metadata: Metadata = {
  title: "Ya",
  description:
    "Ya is your all-in-one app for ride-hailing, food delivery, package delivery, and groceries. Fast, affordable, and reliable – anytime, anywhere.",
  keywords: [
    "Ya app",
    "ride hailing",
    "food delivery",
    "package delivery",
    "grocery delivery",
    "super app",
    "order food online",
    "book rides",
    "courier service",
    "on-demand delivery"
  ],
  applicationName: "Ya",
  authors: [{ name: "Ya Ride" }],
  creator: "Ya Ride",
  publisher: "Ya Ride",
  metadataBase: new URL("https://www.yaride.io"),
  alternates: {
    canonical: "https://www.yaride.io",
  },
  openGraph: {
    title: "Ya",
    description:
      "Book rides, order food, send packages, and get groceries delivered all from one app. Ya makes city life simple and fast.",
    url: "https://www.yaride.io",
    siteName: "Ya",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo_h.png",
        width: 1200,
        height: 630,
        alt: "Ya – Ride, Food, Packages & Groceries in One App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ya",
    description:
      "Book rides, order food, send packages, and get groceries delivered all from one app.",
    creator: "@YaApp",
    images: ["/logo_h.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple_icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}