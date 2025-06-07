"use client"

import { useState, useEffect } from "react"
import { format, subDays, addDays, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from "date-fns"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, Shield, ArrowRight, Moon, Sun, Star, Users, CheckCircle, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import HeroTiles from "./herotiles"
import { Testimonials } from "./testimonials"


export default function LandingPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDark)
  }, [])
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light")
    
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  
  return (
     <div className={`min-h-screen relative ${
      darkMode 
         ? "bg-[#020617]" 
        : "bg-gradient-to-b from-pink-100 to-purple-50"
    } transition-all duration-500`}>
      {/* Dark Radial Glow Background - Only show in dark mode */}
      {darkMode && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle 800px at 50% 200px, #3e3e3e, transparent)`,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
          <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
          <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
            <img src="/blur-02.svg" alt="blur" className="max-w-none" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10">
            <img src="/blur-01.svg" alt="blur" className="max-w-none" />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 ${
        darkMode 
          ? "bg-black/80 backdrop-blur-md border-b border-pink-800/50" 
             : "bg-pink-50/80 backdrop-blur-md border-b border-pink-200/30"
      } transition-all duration-300`}>
        <div className="container mx-auto px-2 py-6 flex justify-between items-center">
          <div className="flex items-center animate-fade-in">
            <div className="relative">
              <Heart className={`h-8 w-8 ${darkMode ? "text-pink-600" : "text-pink-500"} mr-3 animate-pulse`} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r ${
              darkMode 
                ? "from-pink-600 to-purple-600" 
                : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}>
              FlowCare
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${
                darkMode 
                  ? "text-white hover:text-pink-200 hover:bg-pink-500/20" 
                  : "text-purple-600 hover:text-purple-800 hover:bg-purple-100"
              } rounded-full transition-all duration-300 hover:scale-110`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button 
              onClick={() => scrollToSection('features')}
              variant="ghost" 
              className={`${
                darkMode ? "text-white hover:text-pink-200" : "text-purple-700 hover:text-purple-900"
              } hidden md:block`}
            >
              Features
            </Button>
            
            <Button className={`rounded-full px-6 py-2 ${
              darkMode 
                ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/25" 
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25"
            } transition-all duration-300 hover:scale-105 hover:shadow-xl`} onClick={() => router.push('/dashboard')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="pt-60 pb-20 relative overflow-hidden">
        

        <div className="container mx-auto px-6 relative z-10 ">
          <div className={`max-w-full mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
          }`}>
            <div className="mb-10">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                darkMode 
                  ? "bg-pink-800/30 text-white border border-pink-800/50" 
                  : "bg-pink-100 text-pink-700 border border-pink-200"
              } animate-fade-in`}>
                ✨ Your Personal Health Companion
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
              darkMode ? "text-white" : "text-purple-900"
            }`}>
              Track Your Cycle with {" "}
              <span className={`bg-gradient-to-r ${
                darkMode 
                ? "from-pink-600 via-purple-600 to-pink-600" 
                  : "from-pink-600 via-purple-600 to-pink-600"
              } bg-clip-text text-transparent `}>
                FlowCare
              </span>
            
            </h1>
            
            <p className={`text-xl md:text-2xl mb-10 leading-relaxed ${
              darkMode ? "text-white/80" : "text-purple-800"
            }`}>
              Take control of your menstrual health with our beautiful, intuitive tracker. Understanding your cycle empowers you to plan better, feel better, and live better.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-24 mb-16">
              <Button className={`group rounded-full px-8 py-6 text-lg font-semibold ${
                darkMode 
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-600 hover:to-purple-800 text-white shadow-xl shadow-pink-500/25" 
                  : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-600 hover:to-purple-800 text-white shadow-xl shadow-purple-500/25"
              } transition-all duration-300 hover:scale-105 hover:shadow-2xl`} onClick={() => router.push('/dashboard')}>
                Start Tracking Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('features')}
                className={`rounded-full px-8 py-6 text-lg font-semibold ${
                  darkMode 
                    ? "border-pink-800/50 text-white hover:bg-pink-800/20 hover:border-pink-400" 
                    : "border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
                } transition-all duration-300 hover:scale-105`}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            {/* <div className={`flex justify-center items-center space-x-8 ${
              darkMode ? "text-white/60" : "text-purple-600/60"
             }`}>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">10M+ Happy Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">100% Private</span>
              </div>
            </div> */}
 <HeroTiles darkMode={darkMode} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-40`}>
     
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-black"
            }`}>
              Everything You Need in One App
              
            </h2>
            <p className={`text-xl ${
              darkMode ? "text-white/70" : "text-purple-700"
            }`}>
              Comprehensive period tracking designed with love and care
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Predictions",
                description: "AI-powered cycle predictions that learn from your unique patterns to provide accurate forecasts and helpful reminders.",
                gradient: "from-pink-500 to-purple-500"
              },
              {
                icon: Shield,
                title: "Complete Privacy",
                description: "Your data is encrypted and stays on your device. We never share your personal information with anyone, ever.",
                gradient: "from-purple-500 to-pink-500"
              },
              {icon: Heart,
                title: "Mood & Symptoms",
                description: "Track your mood, symptoms, and energy levels to understand your body better and improve your wellbeing.",
                gradient: "from-pink-500 to-red-500"
              }
            ].map((feature, index) => (

      
              <Card 
                key={index}
                className={`group p-8 ${
                  darkMode 
                    ? "bg-[#020617] border-pink-800/50 hover:border-pink-400/40" 
                    : "bg-white/80 border-purple-200 hover:border-purple-300"
                } backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    darkMode ? "text-pink-100/70" : "text-purple-700"
                  }`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            
                
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`py-20`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10M+", label: "Active Users" },
              { number: "99.9%", label: "Accuracy Rate" },
              { number: "150+", label: "Countries" },
              { number: "4.9★", label: "App Store Rating" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${
                  darkMode 
                    ? "from-pink-700 to-purple-500" 
                    : "from-pink-600 to-purple-600"
                } bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className={`text-lg ${
                  darkMode ? "text-white-100/70" : "text-purple-700"
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Testimonials darkMode={darkMode}/>

      {/* CTA Section */}
      <section className={`py-20 ${ 
          darkMode ? "bg-[#020617]" : "bg-pink-50"
      }`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Ready to Take Control?
          </h2>
          <p className={`text-xl mb-10 ${
            darkMode ? "text-pink-100/80" : "text-purple-700"
          }`}>
            Join millions of women who trust FlowCare for their period tracking needs
          </p>
          <div className="flex justify-center space-x-4">
            <Button className={`rounded-full px-8 py-6 text-lg font-semibold ${
              darkMode 
                ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl shadow-pink-500/25" 
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl shadow-purple-500/25"
            } transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
              Download Now - Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${
         darkMode ? "bg-[#020617]" : "bg-pink-50"
      } text-white`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-pink-400 mr-2" />
              <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-purple-900"}`}>FlowCare</span>
            </div>
               <div className={`text-sm ${darkMode ? "text-gray-400" : "text-purple-700"}`}>
              © 2025 FlowCare. Made with ❤️ by Rucha.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
