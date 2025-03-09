"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Mail, User, UserPen } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useEffect, useState } from "react"

export default function ProfilePage() {

  type UserInfo = {
    name: string
    username: string
    email: string
    walletAddress: string
    createdAt: string
  }

  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false)
  const [editingWalletInfo, setEditingWalletInfo] = useState(false)
  const [editingAvailability, setEditingAvailability] = useState(false)

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch("/api/profile")
        const data = await response.json()
        console.log(data)
        setUserInfo(data)
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }

    fetchProfileData()
  }, [])

  const handleSave = async (section: string) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section, data: userInfo }),
      })
      const data = await response.json()
      console.log(data)
      setEditingPersonalInfo(false)
      setEditingWalletInfo(false)
      setEditingAvailability(false)
    } catch (error) {
      console.error("Error saving profile data:", error)
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-4 py-12">
          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {userInfo ? (
            <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <Button
            onClick={() => setEditingPersonalInfo(!editingPersonalInfo)}
            className="ml-auto w-20 px-2 py-1 text-sm"
              >
            {editingPersonalInfo ? "Save" : "Edit"}
              </Button>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-purple-400" />
            {editingPersonalInfo ? (
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value } as UserInfo)}
                className="form-input text-black bg-white"
              />
            ) : (
              <span>{userInfo.name}</span>
            )}
              </div>
              <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-purple-400" />
            <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center">
            <UserPen className="h-5 w-5 mr-2 text-purple-400" />
            <span>{userInfo.username}</span>
              </div>
              <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-400" />
            <span>Member since {new Date(userInfo.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Wallet Information</h2>
              <Button
            onClick={() => setEditingWalletInfo(!editingWalletInfo)}
            className="ml-auto w-20 px-2 py-1 text-sm"
              >
            {editingWalletInfo ? "Save" : "Edit"}
              </Button>
            </div>
            <div className="mt-4">
              {editingWalletInfo ? (
            <input
              type="text"
              value={userInfo.walletAddress || ""}
              onChange={(e) => setUserInfo({ ...userInfo, walletAddress: e.target.value } as UserInfo)}
              className="form-input text-black bg-white"
            />
              ) : (
            <p className="break-all">{userInfo.walletAddress ? userInfo.walletAddress : "Not Set Yet"}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Availability</h2>
              <Button
            onClick={() => setEditingAvailability(!editingAvailability)}
            className="ml-auto w-20 px-2 py-1 text-sm"
              >
            {editingAvailability ? "Save" : "Edit"}
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {editingAvailability ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300">Select Days</label>
                <div className="flex flex-col space-y-2">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                type="checkbox"
                value={day}
                checked={selectedDays.includes(day)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDays([...selectedDays, day])
                  } else {
                    setSelectedDays(selectedDays.filter((d) => d !== day))
                  }
                }}
                className="form-checkbox text-purple-500"
                  />
                  <span>{day}</span>
                </label>
              ))}
                </div>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300">Select Time Slots</label>
                <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
                  <div>
                  <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                    </svg>
                    </div>
                    <input
                    type="time"
                    id="start-time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="09:00"
                    max="18:00"
                    value="00:00"
                    required
                    onChange={(e) => setSelectedTimeSlots([e.target.value, selectedTimeSlots[1]])}
                    />
                  </div>
                  </div>
                  <div>
                  <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">End time:</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                    </svg>
                    </div>
                    <input
                    type="time"
                    id="end-time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="09:00"
                    max="18:00"
                    value="00:00"
                    required
                    onChange={(e) => setSelectedTimeSlots([selectedTimeSlots[0], e.target.value])}
                    />
                  </div>
                  </div>
                </form>
                </div>
            </>
              ) : (
            <div>
              <p className="text-sm text-gray-300">Selected Days: {selectedDays.join(", ")}</p>
              <p className="text-sm text-gray-300">Selected Time Slots: {selectedTimeSlots.join(", ")}</p>
            </div>
              )}
            </div>
          </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
          <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
            </div>
          )}
        </CardContent>
          </Card>
        </main>
      </div>
    </DashboardLayout>
  )
}
