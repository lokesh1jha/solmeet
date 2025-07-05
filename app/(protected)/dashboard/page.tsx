"use client"

import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"
import { Stats } from "@/components/dashboard/stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session } = useSession()
  const userName = session?.user?.name?.split(' ')[0] || 'there'
  
  const quickActions = [
    {
      title: "Find Experts",
      description: "Browse and book sessions",
      icon: Users,
      href: "/experts",
      color: "from-purple-600 to-blue-600"
    },
    {
      title: "Schedule Meeting",
      description: "View your calendar",
      icon: Calendar,
      href: "/dashboard/meetings",
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Messages",
      description: "Chat with experts",
      icon: MessageSquare,
      href: "/dashboard/messages",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Become Expert",
      description: "Start teaching others",
      icon: Zap,
      href: "/dashboard/settings",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl" />
          <div className="relative p-8 rounded-2xl border border-purple-500/20">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-gray-400 text-lg">Ready to learn something new today?</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <Link href={action.href}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">{action.title}</h3>
                        <p className="text-sm text-gray-400">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <Stats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingMeetings />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

