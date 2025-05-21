"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CalendarIcon, Settings, Cloud, Leaf, Moon, Sun } from "lucide-react"
import { format, addDays, differenceInDays } from "date-fns"
import CycleStatus from "@/components/cycle-status"
import PeriodForm from "@/components/period-form"
import SettingsModal from "@/components/settings-modal"
import { useToast } from "@/hooks/use-toast"
import { calculateCycleDates, type CycleData } from "@/lib/cycle-calculations"
import { requestNotificationPermission, scheduleNotification } from "@/lib/notifications"

export default function Dashboard() {
  const [cycleData, setCycleData] = useState<CycleData | null>(null)
  const [showPeriodForm, setShowPeriodForm] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [petName, setPetName] = useState("Totoro")
  const [darkMode, setDarkMode] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load data from localStorage
    const savedCycleData = localStorage.getItem("cycleData")
    const savedPetName = localStorage.getItem("petName")
    const savedTheme = localStorage.getItem("theme")

    if (savedCycleData) {
      const parsedData = JSON.parse(savedCycleData)
      // Convert string dates back to Date objects
      if (parsedData.periodStartDates) {
        parsedData.periodStartDates = parsedData.periodStartDates.map((d: string) => new Date(d))
      }
      if (parsedData.periodEndDates) {
        parsedData.periodEndDates = parsedData.periodEndDates.map((d: string) => new Date(d))
      }
      if (parsedData.nextPeriodStart) {
        parsedData.nextPeriodStart = new Date(parsedData.nextPeriodStart)
      }
      if (parsedData.ovulationDay) {
        parsedData.ovulationDay = new Date(parsedData.ovulationDay)
      }
      if (parsedData.fertileWindowStart) {
        parsedData.fertileWindowStart = new Date(parsedData.fertileWindowStart)
      }
      if (parsedData.fertileWindowEnd) {
        parsedData.fertileWindowEnd = new Date(parsedData.fertileWindowEnd)
      }

      setCycleData(parsedData)
    }

    if (savedPetName) {
      setPetName(savedPetName)
    }

    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }

    // Request notification permission
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (cycleData) {
      // Save to localStorage whenever cycleData changes
      localStorage.setItem("cycleData", JSON.stringify(cycleData))

      // Schedule notifications
      if (cycleData.nextPeriodStart) {
        scheduleNotification(
          "Period Starting Soon",
          `${petName}'s cycle is beginning tomorrow!`,
          new Date(cycleData.nextPeriodStart.getTime() - 24 * 60 * 60 * 1000),
        )
      }

      if (cycleData.ovulationDay) {
        scheduleNotification("Ovulation Day", `${petName} is ovulating today!`, cycleData.ovulationDay)
      }

      if (cycleData.fertileWindowStart) {
        scheduleNotification(
          "Fertile Window Beginning",
          `${petName}'s fertile window is starting tomorrow!`,
          new Date(cycleData.fertileWindowStart.getTime() - 24 * 60 * 60 * 1000),
        )
      }
    }
  }, [cycleData, petName])

  useEffect(() => {
    // Save petName to localStorage
    localStorage.setItem("petName", petName)
  }, [petName])

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

  const handleAddPeriod = (startDate: Date, endDate: Date) => {
    const newCycleData = calculateCycleDates(startDate, endDate, cycleData)
    setCycleData(newCycleData)
    setShowPeriodForm(false)

    toast({
      title: "Period added",
      description: "Your cycle information has been updated!",
      className: darkMode 
        ? "bg-pink-900 border-pink-800 text-pink-100" 
        : "bg-pink-50 border-pink-200 text-pink-800",
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    // Check if the selected date is already marked as a period
    if (cycleData?.periodStartDates && cycleData.periodEndDates) {
      for (let i = 0; i < cycleData.periodStartDates.length; i++) {
        const start = cycleData.periodStartDates[i]
        const end = cycleData.periodEndDates[i]

        if (date >= start && date <= end) {
          // This date is already marked as a period
          toast({
            title: "Period already recorded",
            description: `This date is already marked as a cycle day.`,
            className: darkMode 
              ? "bg-purple-900 border-purple-800 text-purple-100" 
              : "bg-purple-50 border-purple-200 text-purple-800",
          })
          return
        }
      }
    }

    // If not already marked, open the form to add a new period
    setShowPeriodForm(true)
  }

  const getDayClassName = (date: Date) => {
    if (!cycleData) return ""

    // Check if date is in a period
    if (cycleData.periodStartDates && cycleData.periodEndDates) {
      for (let i = 0; i < cycleData.periodStartDates.length; i++) {
        const start = cycleData.periodStartDates[i]
        const end = cycleData.periodEndDates[i]

        if (date >= start && date <= end) {
          return darkMode 
            ? "bg-pink-800 rounded-full text-pink-100" 
            : "bg-pink-200 rounded-full text-purple-800"
        }
      }
    }

    // Check if date is ovulation day
    if (
      cycleData.ovulationDay &&
      date.getDate() === cycleData.ovulationDay.getDate() &&
      date.getMonth() === cycleData.ovulationDay.getMonth() &&
      date.getFullYear() === cycleData.ovulationDay.getFullYear()
    ) {
      return darkMode 
        ? "bg-pink-700 rounded-full text-pink-100" 
        : "bg-purple-200 rounded-full text-purple-800"
    }

    // Check if date is in fertile window
    if (
      cycleData.fertileWindowStart &&
      cycleData.fertileWindowEnd &&
      date >= cycleData.fertileWindowStart &&
      date <= cycleData.fertileWindowEnd
    ) {
      return darkMode 
        ? "bg-pink-900 rounded-full text-pink-100" 
        : "bg-purple-100 rounded-full text-purple-700"
    }

    return ""
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? "bg-black text-pink-300" 
        : "bg-gradient-to-b from-pink-100 to-purple-50 text-purple-800"
    } bg-fixed relative transition-colors duration-300`}>
      {/* Decorative elements */}
      <div className={`absolute top-10 left-10 ${darkMode ? "text-pink-800" : "text-pink-200"} opacity-30`}>
        <Cloud size={120} />
      </div>
      <div className={`absolute bottom-10 right-10 ${darkMode ? "text-purple-800" : "text-purple-200"} opacity-30`}>
        <Leaf size={120} />
      </div>
      <div className={`absolute top-40 right-20 ${darkMode ? "text-pink-800" : "text-pink-200"} opacity-20`}>
        <Cloud size={80} />
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Heart className={`h-8 w-8 ${darkMode ? "text-pink-400" : "text-pink-500"} mr-3`} />
            <h1 className={`text-3xl font-bold ${darkMode ? "text-pink-300" : "text-purple-800"} font-display tracking-wide`}>
              My {petName}'s Cycle
            </h1>
          </div>
          <div className="flex items-center space-x-2">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className={`${
                darkMode 
                  ? "text-pink-300 hover:text-pink-800 hover:bg-pink-500/50" 
                  : "text-purple-600 hover:text-purple-800 hover:bg-purple-800/50"
              } rounded-full`}
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className={`${
              darkMode 
                ? "backdrop-blur-md bg-black/40 border-pink-800/50" 
                : "backdrop-blur-md bg-white/40 border-0"
              } shadow-lg rounded-xl overflow-hidden`}>
              <CardHeader className={`${
                darkMode 
                  ? "bg-gradient-to-r from-pink-900/80 to-black/80" 
                  : "bg-gradient-to-r from-pink-200/80 to-purple-200/80"
                } pb-6`}>
                <CardTitle className={`text-center ${
                  darkMode ? "text-pink-300" : "text-purple-800"
                } text-xl`}>Today's Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <CycleStatus cycleData={cycleData} petName={petName} />
              </CardContent>
            </Card>

            <Card className={`${
              darkMode 
                ? "backdrop-blur-md bg-black/40 border-pink-800/50" 
                : "backdrop-blur-md bg-white/40 border-0"
              } shadow-lg rounded-xl overflow-hidden`}>
              <CardHeader className={`${
                darkMode 
                  ? "bg-gradient-to-r from-pink-900/80 to-black/80" 
                  : "bg-gradient-to-r from-pink-200/80 to-purple-200/80"
                } pb-6`}>
                <CardTitle className={`text-center ${
                  darkMode ? "text-pink-300" : "text-purple-800"
                } text-xl`}>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                {cycleData ? (
                  <div className="space-y-5">
                    {cycleData.nextPeriodStart && (
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          darkMode ? "bg-pink-600" : "bg-pink-400"
                        } mr-4 shadow-sm`}></div>
                        <div>
                          <p className={`${darkMode ? "text-pink-200" : "text-purple-700"} font-medium`}>Next Cycle</p>
                          <p className={darkMode ? "text-pink-300" : "text-purple-600"}>
                            {format(cycleData.nextPeriodStart, "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    )}

                    {cycleData.fertileWindowStart && cycleData.fertileWindowEnd && (
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          darkMode ? "bg-purple-600" : "bg-purple-300"
                        } mr-4 shadow-sm`}></div>
                        <div>
                          <p className={`${darkMode ? "text-purple-200" : "text-purple-700"} font-medium`}>
                            Fertile Window
                          </p>
                          <p className={darkMode ? "text-purple-300" : "text-purple-600"}>
                            {format(cycleData.fertileWindowStart, "MMMM d")} -{" "}
                            {format(cycleData.fertileWindowEnd, "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    )}

                    {cycleData.ovulationDay && (
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          darkMode ? "bg-purple-500" : "bg-purple-400"
                        } mr-4 shadow-sm`}></div>
                        <div>
                          <p className={`${darkMode ? "text-purple-200" : "text-purple-700"} font-medium`}>Ovulation Day</p>
                          <p className={darkMode ? "text-purple-300" : "text-purple-600"}>
                            {format(cycleData.ovulationDay, "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-purple-600 mb-4">No cycle data recorded yet</p>
                    <Button 
                      onClick={() => setShowPeriodForm(true)} 
                      className="mt-2 bg-pink-500 hover:bg-pink-600 text-white shadow-md rounded-full px-6"
                    >
                      Add First Cycle
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className={`${
              darkMode 
                ? "backdrop-blur-md bg-black/40 border-pink-800/50" 
                : "backdrop-blur-md bg-white/40 border-0"
              } shadow-lg rounded-xl overflow-hidden`}>
              <CardHeader className={`${
                darkMode 
                  ? "bg-gradient-to-r from-pink-900/80 to-black/80" 
                  : "bg-gradient-to-r from-pink-200/80 to-purple-200/80"
                } pb-6 flex justify-between items-center`}>
                <CardTitle className={`text-center ${
                  darkMode ? "text-pink-300" : "text-purple-800"
                } text-xl`}>Calendar</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPeriodForm(true)}
                  className={`${
                    darkMode 
                      ? "text-pink-300 border-pink-800 hover:bg-pink-900/50" 
                      : "text-purple-600 border-purple-200 hover:bg-purple-100/50"
                  } rounded-full`}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Add Cycle
                </Button>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <div className="calendar-container">
                  <Calendar
                    mode="single"
                    onSelect={handleDateSelect}
                    className={`rounded-lg border-none shadow-inner ${
                      darkMode ? "bg-grey-850/70" : "bg-white/30"
                    }`}
                    modifiersClassNames={{
                      today: "bg-purple-50 text-purple-900 font-bold border border-purple-200",
                    }}
                    modifiers={{
                      period:
                        cycleData?.periodStartDates?.flatMap((start, i) => {
                          const end = cycleData.periodEndDates[i]
                          const days = []
                          const current = new Date(start)
                          while (current <= end) {
                            days.push(new Date(current))
                            current.setDate(current.getDate() + 1)
                          }
                          return days
                        }) || [],
                      ovulation: cycleData?.ovulationDay ? [cycleData.ovulationDay] : [],
                      fertile:
                        cycleData?.fertileWindowStart && cycleData?.fertileWindowEnd
                          ? Array.from(
                              { length: differenceInDays(cycleData.fertileWindowEnd, cycleData.fertileWindowStart) + 1 },
                              (_, i) => addDays(new Date(cycleData.fertileWindowStart), i),
                            )
                          : [],
                    }}
                    styles={{
                      day: (date) => {
                        return { className: getDayClassName(date) }
                      },
                    }}
                  />
                </div>

                <div className="mt-6 flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-pink-200 border border-pink-300 mr-2"></div>
                    <span className={`${
                  darkMode ? "text-pink-300" : "text-purple-800"
                } text-xs`}>Cycle Days</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-200 border border-purple-300 mr-2"></div>
                    <span className={`${
                  darkMode ? "text-pink-300" : "text-purple-800"
                } text-xs`}>Ovulation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-200 border border-purple-300 mr-2"></div>
                    <span className={`${
                  darkMode ? "text-pink-300" : "text-purple-800"
                } text-xs`}>Ovulation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showPeriodForm && <PeriodForm onSubmit={handleAddPeriod} onCancel={() => setShowPeriodForm(false)} />}

        {showSettings && (
          <SettingsModal petName={petName} setPetName={setPetName} onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  )
}