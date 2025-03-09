"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, DollarSign, Mail, User, UserPen } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useEffect, useState } from "react"
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import TimeSelector from "@/components/calender/time"

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
  const [editing, setEditing] = useState(false)
  const [startTime, setStartTime] = useState({ hour: "01", minute: "30", period: "AM" });
  const [endTime, setEndTime] = useState({ hour: "05", minute: "30", period: "PM" });


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

  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: userInfo }),
      })
      const data = await response.json()
      console.log(data)
      setEditing(false)
    } catch (error) {
      console.error("Error saving profile data:", error)
      setEditing(false)
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
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 mt-4">

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

                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Wallet Information</h2>
                    </div>
                    <div className="mt-4">
                      {editing ? (
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
                    </div>
                    <div className="mt-4 space-y-4">
                      {editing ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-300">Select Days</label>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                              <Button className="w-half text-left">{selectedDays.length > 0 ? selectedDays.join(", ") : "Select Days"}</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-white text-black rounded shadow-lg p-2">
                              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                <DropdownMenuItem key={day} asChild>
                                <label className="flex items-center space-x-2">
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
                                </DropdownMenuItem>
                              ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            
                          </div>
                          <div className="space-y-4">
                          <TimeSelector label="From" time={startTime} setTime={setStartTime} />
                          <TimeSelector label="To" time={endTime} setTime={setEndTime} />
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

                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        if (editing) {
                          handleSave()
                        } else {
                          setEditing(true)
                        }
                      }}
                      className="ml-auto w-20 px-2 py-1 text-sm"
                    >
                      {editing ? "Save" : "Edit"}
                    </Button>
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
  )}