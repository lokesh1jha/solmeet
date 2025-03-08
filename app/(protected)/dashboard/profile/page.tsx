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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <Button
                  onClick={() => setEditingPersonalInfo(!editingPersonalInfo)}
                  className="ml-auto w-20 px-2 py-1 text-sm"
                >
                  {editingPersonalInfo ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                {userInfo ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-purple-400" />
                      {editingPersonalInfo ?
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value } as UserInfo)}
                          className="form-input text-black bg-white"
                        />
                        : <span>{userInfo.name}</span>}
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
                )
                  : (
                    <div className="flex justify-center items-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    </div>
                  )}

              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle>Wallet Information</CardTitle>
                <Button onClick={() => setEditingWalletInfo(!editingWalletInfo)} className="ml-auto w-20 px-2 py-1 text-sm">
                  {editingWalletInfo ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                {userInfo ?
                  (editingWalletInfo ? (
                    <input
                      type="text"
                      value={userInfo?.walletAddress || ""}
                      onChange={(e) => setUserInfo({ ...userInfo, walletAddress: e.target.value } as UserInfo)}
                      className="form-input text-black bg-white"
                    />
                  ) : (
                    <p className="break-all">{userInfo?.walletAddress ? userInfo?.walletAddress : "Not Set Yet"}</p>
                  )) :
                  (
                    <div className="flex justify-center items-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <Button onClick={() => setEditingAvailability(!editingAvailability)} className="ml-auto w-20 px-2 py-1 text-sm">
                {editingAvailability ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                      <div className="flex flex-col space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300">Start Time</label>
                          <div className="flex items-center space-x-2">
                            <select className="form-select text-white bg-white">
                              {["AM", "PM"].map((period) => (
                                <option key={period} value={period}>{period}</option>
                              ))}
                            </select>
                            <select className="form-select text-white bg-white">
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <option key={hour} value={hour}>{hour}</option>
                              ))}
                            </select>
                            <select className="form-select text-white bg-white">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300">End Time</label>
                          <div className="flex items-center space-x-2">
                            <select className="form-select text-white bg-white">
                              {["AM", "PM"].map((period) => (
                                <option key={period} value={period}>{period}</option>
                              ))}
                            </select>
                            <select className="form-select text-white bg-white">
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <option key={hour} value={hour}>{hour}</option>
                              ))}
                            </select>
                            <select className="form-select text-white bg-white">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-sm text-gray-300">Selected Days: {selectedDays.join(", ")}</p>
                    <p className="text-sm text-gray-300">Selected Time Slots: {selectedTimeSlots.join(", ")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </DashboardLayout>
  )
}
