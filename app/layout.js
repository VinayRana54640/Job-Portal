import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fresher Jobs & Graduate Opportunities | Job4Grads",
  description:
    "Find your first job faster with Job4Grads. Get intelligent job matching, resume support, and interview opportunities with top startups and MNCs.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5, // Allow zoom for accessibility
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Cashfree SDK (load before page interactive) */}
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
