"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, Shield, ArrowRight, Moon, Sun } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dashboard } from "./dashboard"

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light")
    
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleGetStarted = () => {
    return <Dashboard />
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? "bg-black text-pink-300" 
        : "bg-white text-purple-800"
    } transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`fixed w-full z-50 ${
        darkMode 
          ? "bg-black/80 backdrop-blur-md border-b border-pink-900/30" 
          : "bg-white/80 backdrop-blur-md border-b border-purple-100"
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Heart className={`h-8 w-8 ${darkMode ? "text-pink-500" : "text-pink-500"} mr-2`} />
            <span className={`text-2xl font-bold font-display ${
              darkMode ? "text-pink-300" : "text-purple-800"
            }`}>Periody</span>
          </div>
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${
                darkMode 
                  ? "text-pink-300 hover:text-pink-800 hover:bg-pink-500/50" 
                  : "text-purple-600 hover:text-purple-800 hover:bg-purple-800/50"
              } rounded-full`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link href="/dashboard">
              <Button onClick={handleGetStarted} className={`rounded-full px-6 ${
                darkMode 
                  ? "bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white" 
                  : "bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
              }`}>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <div className={`w-64 h-64 rounded-full ${
            darkMode ? "bg-pink-800" : "bg-pink-200"
          } blur-3xl`}></div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <div className={`w-96 h-96 rounded-full ${
            darkMode ? "bg-purple-800" : "bg-purple-200"
          } blur-3xl`}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 font-display tracking-tight ${
              darkMode ? "text-pink-300" : "text-purple-800"
            }`}>
              Track Your Cycle with <span className={`${
                darkMode ? "text-pink-400" : "text-pink-500"
              }`}>Love</span> and Care
            </h1>
            <p className={`text-xl mb-10 ${
              darkMode ? "text-pink-200/80" : "text-purple-600"
            }`}>
              Periody helps you understand your body better with a personalized period tracking experience. 
              Monitor your cycle, predict your fertile window, and take control of your reproductive health.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              
                <Button onClick={handleGetStarted} className={`rounded-full px-8 py-6 text-lg ${
                  darkMode 
                    ? "bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white" 
                    : "bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
                }`}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
             
              <Button variant="outline" className={`rounded-full px-8 py-6 text-lg ${
                darkMode 
                  ? "border-pink-700 text-pink-300 hover:bg-pink-900/30" 
                  : "border-purple-300 text-purple-700 hover:bg-purple-100/50"
              }`}>
                Learn More
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className={`rounded-2xl overflow-hidden shadow-2xl border ${
            darkMode 
              ? "border-pink-800/30 bg-gray-900/50" 
              : "border-purple-100 bg-white/50"
          }`}>
            <div className={`h-8 ${
              darkMode 
                ? "bg-gray-800" 
                : "bg-gray-100"
            } flex items-center px-4`}>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-4">
              <div className={`rounded-xl overflow-hidden ${
                darkMode 
                  ? "bg-black border border-pink-900/30" 
                  : "bg-gradient-to-b from-pink-50 to-purple-50 border border-purple-100"
              }`}>
                <div className={`p-4 ${
                  darkMode 
                    ? "bg-gradient-to-r from-pink-900/50 to-purple-900/50" 
                    : "bg-gradient-to-r from-pink-200/50 to-purple-200/50"
                }`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Heart className={`h-6 w-6 ${darkMode ? "text-pink-400" : "text-pink-500"} mr-2`} />
                      <span className={`text-lg font-bold ${
                        darkMode ? "text-pink-300" : "text-purple-800"
                      }`}>My Cycle</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className={`w-8 h-8 rounded-full ${
                        darkMode ? "bg-gray-800" : "bg-white/70"
                      } flex items-center justify-center`}>
                        <Calendar className={`h-4 w-4 ${
                          darkMode ? "text-pink-400" : "text-purple-500"
                        }`} />
                      </div>
                      <div className={`w-8 h-8 rounded-full ${
                        darkMode ? "bg-gray-800" : "bg-white/70"
                      } flex items-center justify-center`}>
                        <Shield className={`h-4 w-4 ${
                          darkMode ? "text-pink-400" : "text-purple-500"
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-full flex items-center justify-center text-sm ${
                          i === 14 
                            ? darkMode 
                              ? "bg-pink-800 text-pink-100" 
                              : "bg-pink-200 text-purple-800"
                            : i >= 12 && i <= 16 
                              ? darkMode 
                                ? "bg-pink-900/50 text-pink-200" 
                                : "bg-purple-100 text-purple-700"
                              : darkMode 
                                ? "bg-gray-800 text-gray-400" 
                                : "bg-white text-gray-500"
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}>
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          darkMode ? "bg-pink-600" : "bg-pink-400"
                        } mr-3`}></div>
                        <span className={`font-medium ${
                          darkMode ? "text-pink-300" : "text-purple-700"
                        }`}>Next Cycle</span>
                      </div>
                      <p className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>June 15, 2024</p>
                    </div>
                    <div className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}>
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          darkMode ? "bg-purple-600" : "bg-purple-400"
                        } mr-3`}></div>
                        <span className={`font-medium ${
                          darkMode ? "text-pink-300" : "text-purple-700"
                        }`}>Fertile Window</span>
                      </div>
                      <p className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>June 1 - June 5, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${
        darkMode ? "bg-gray-900" : "bg-purple-50"
      }`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-16 font-display ${
            darkMode ? "text-pink-300" : "text-purple-800"
          }`}>Why Choose Periody?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl ${
              darkMode 
                ? "bg-black border border-pink-900/30" 
                : "bg-white shadow-lg"
            }`}>
              <div className={`w-14 h-14 rounded-full mb-6 flex items-center justify-center ${
                darkMode 
                  ? "bg-pink-900/50" 
                  : "bg-pink-100"
              }`}>
                <Calendar className={`h-7 w-7 ${
                  darkMode ? "text-pink-400" : "text-pink-500"
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                darkMode ? "text-pink-300" : "text-purple-800"
              }`}>Accurate Predictions</h3>
              <p className={darkMode ? "text-pink-200/70" : "text-purple-600"}>
                Our algorithm learns from your data to provide increasingly accurate cycle predictions, helping you plan ahead with confidence.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${
              darkMode 
                ? "bg-black border border-pink-900/30" 
                : "bg-white shadow-lg"
            }`}>
              <div className={`w-14 h-14 rounded-full mb-6 flex items-center justify-center ${
                darkMode 
                  ? "bg-pink-900/50" 
                  : "bg-pink-100"
              }`}>
                <Shield className={`h-7 w-7 ${
                  darkMode ? "text-pink-400" : "text-pink-500"
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                darkMode ? "text-pink-300" : "text-purple-800"
              }`}>Privacy First</h3>
              <p className={darkMode ? "text-pink-200/70" : "text-purple-600"}>
                Your data stays on your device. We prioritize your privacy and ensure your sensitive information remains secure and private.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${
              darkMode 
                ? "bg-black border border-pink-900/30" 
                : "bg-white shadow-lg"
            }`}>
              <div className={`w-14 h-14 rounded-full mb-6 flex items-center justify-center ${
                darkMode 
                  ? "bg-pink-900/50" 
                  : "bg-pink-100"
              }`}>
                <Heart className={`h-7 w-7 ${
                  darkMode ? "text-pink-400" : "text-pink-500"
                }`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                darkMode ? "text-pink-300" : "text-purple-800"
              }`}>Love & Care</h3>
              <p className={darkMode ? "text-pink-200/70" : "text-purple-600"}>
                We are dedicated to providing a supportive and caring experience for all users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
