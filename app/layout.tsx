import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Quicksand } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Periods Tracker",
  description: "Track your periods",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${quicksand.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
