import type { Metadata } from "next"
import LandingPage from "@/components/Landing-page"

export const metadata: Metadata = {
  title: "Periods Tracker",
  description: "Track your periods",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <LandingPage />
    </main>
  )
}