"use client"

import { useWallet } from "@/components/connect-wallet-button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, User } from "lucide-react"

export default function ProfilePage() {
  const { isConnected, walletAddress } = useWallet()

  // Mock data for demonstration
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "October 2023",
    totalSessions: 12,
    totalSpent: 6.2,
  }

  const pastSessions = [
    { id: 1, expert: "Alex Rivera", date: "2023-10-15", duration: "60 min", price: 0.5 },
    { id: 2, expert: "Sophia Chen", date: "2023-10-10", duration: "60 min", price: 0.65 },
    { id: 3, expert: "Marcus Johnson", date: "2023-10-05", duration: "60 min", price: 0.45 },
  ]

  const payments = [
    { id: 1, date: "2023-10-15", amount: 0.5, description: "Session with Alex Rivera" },
    { id: 2, date: "2023-10-10", amount: 0.65, description: "Session with Sophia Chen" },
    { id: 3, date: "2023-10-05", amount: 0.45, description: "Session with Marcus Johnson" },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="mb-8">Please connect your wallet to view your profile.</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Connect Wallet
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-400" />
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                  <span>Member since {userInfo.memberSince}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                  <span>Total spent: {userInfo.totalSpent} SOL</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle>Wallet Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="break-all">{walletAddress}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle>Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
                  <span>Total Sessions: {userInfo.totalSessions}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                  <span>Average Cost: {(userInfo.totalSpent / userInfo.totalSessions).toFixed(2)} SOL</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sessions">Past Sessions</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>
          <TabsContent value="sessions">
            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {pastSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between border-b border-purple-500/20 pb-4"
                    >
                      <div>
                        <h3 className="font-semibold">{session.expert}</h3>
                        <p className="text-sm text-gray-400">{session.date}</p>
                      </div>
                      <div className="text-right">
                        <p>{session.duration}</p>
                        <p className="text-sm text-purple-400">{session.price} SOL</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between border-b border-purple-500/20 pb-4"
                    >
                      <div>
                        <h3 className="font-semibold">{payment.description}</h3>
                        <p className="text-sm text-gray-400">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-400">{payment.amount} SOL</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

