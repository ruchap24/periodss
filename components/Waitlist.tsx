"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the email to your backend
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success!",
        description: "You're on the waitlist! We'll notify you when FlowCare launches.",
        className: darkMode 
          ? "bg-pink-900 border-pink-800 text-pink-100" 
          : "bg-pink-50 border-pink-200 text-pink-800",
      })
      
      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? "bg-[#020617]" 
        : "bg-gradient-to-b from-pink-100 to-purple-50"
    }`}>
      {darkMode && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle 800px at 50% 200px, #3e3e3e, transparent)`,
          }}
        />
      )}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <Heart className={`h-12 w-12 ${
              darkMode ? "text-pink-600" : "text-pink-500"
            } animate-pulse`} />
          </div>
          
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Join the Waitlist
          </h1>
          
          <p className={`text-lg mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Be the first to know when FlowCare launches. Get early access and exclusive updates!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg ${
                darkMode 
                  ? "bg-gray-900 border-gray-700 text-white" 
                  : "bg-white border-gray-200"
              }`}
            />
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-full py-6 text-lg font-semibold ${
                darkMode 
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-600 hover:to-purple-800 text-white" 
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              } transition-all duration-300 hover:scale-105`}
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>

          <p className={`mt-6 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            We respect your privacy and will never share your email.
          </p>
        </div>
      </div>
    </div>
  )
}